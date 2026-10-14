import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { portfolioData } from '@/data';

const mocks = vi.hoisted(() => ({ send: vi.fn(), ctor: vi.fn() }));

vi.mock('resend', () => ({
  Resend: class {
    emails = { send: mocks.send };
    constructor(key: string) {
      mocks.ctor(key);
    }
  },
}));

import { POST } from './route';

// A fresh IP per request keeps the route's in-memory rate limiter out of the way.
let nextIp = 0;
const post = (body: unknown, ip = `10.0.0.${++nextIp}`) =>
  POST(
    new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-forwarded-for': ip },
      body: JSON.stringify(body),
    })
  );

const valid = { name: 'Ada', email: 'ada@example.com', message: 'Hello there', company: '' };

const ENV_KEYS = ['RESEND_API_KEY', 'CONTACT_TO_EMAIL', 'CONTACT_FROM_EMAIL'] as const;
const saved: Partial<Record<(typeof ENV_KEYS)[number], string>> = {};

beforeEach(() => {
  for (const key of ENV_KEYS) saved[key] = process.env[key];
  process.env.RESEND_API_KEY = 're_test_key';
  delete process.env.CONTACT_TO_EMAIL;
  delete process.env.CONTACT_FROM_EMAIL;
  mocks.send.mockReset();
  mocks.ctor.mockReset();
  mocks.send.mockResolvedValue({ error: null });
});

afterEach(() => {
  for (const key of ENV_KEYS) {
    if (saved[key] === undefined) delete process.env[key];
    else process.env[key] = saved[key];
  }
  vi.restoreAllMocks();
});

describe('POST /api/contact', () => {
  it('answers 503 when the email key is missing', async () => {
    delete process.env.RESEND_API_KEY;
    const res = await post(valid);
    expect(res.status).toBe(503);
    expect(mocks.send).not.toHaveBeenCalled();
  });

  it('rejects blank fields, bad emails and oversized messages', async () => {
    expect((await post({ ...valid, name: '   ' })).status).toBe(400);
    expect((await post({ ...valid, email: 'not-an-email' })).status).toBe(400);
    expect((await post({ ...valid, message: 'x'.repeat(5001) })).status).toBe(400);
    expect(mocks.send).not.toHaveBeenCalled();
  });

  it('quietly accepts honeypot submissions without sending anything', async () => {
    const res = await post({ ...valid, company: 'Acme Bots' });
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(mocks.send).not.toHaveBeenCalled();
  });

  it('sends a valid message to the default inbox with the visitor as reply-to', async () => {
    const res = await post(valid);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(mocks.send).toHaveBeenCalledTimes(1);
    expect(mocks.send).toHaveBeenCalledWith(
      expect.objectContaining({
        to: [portfolioData.personal.contact.email],
        replyTo: 'ada@example.com',
        subject: 'Portfolio message from Ada',
      })
    );
  });

  it('ignores stray quotes and spaces pasted into the env values', async () => {
    process.env.RESEND_API_KEY = '  "re_pasted_key"\n';
    process.env.CONTACT_TO_EMAIL = ' "inbox@example.com" ';
    await post(valid);
    expect(mocks.ctor).toHaveBeenCalledWith('re_pasted_key');
    expect(mocks.send).toHaveBeenCalledWith(expect.objectContaining({ to: ['inbox@example.com'] }));
  });

  it('hides provider error details from the visitor', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    mocks.send.mockResolvedValue({
      error: { message: 'API key is invalid', name: 'validation_error', statusCode: 401 },
    });
    const res = await post(valid);
    expect(res.status).toBe(500);
    const body = (await res.json()) as { error: string };
    expect(body.error).toBe('Failed to send message. Please try again later.');
    expect(body.error).not.toMatch(/invalid/i);
  });

  it('rate-limits an IP after three successful sends', async () => {
    const ip = '192.168.9.9';
    for (let i = 0; i < 3; i++) expect((await post(valid, ip)).status).toBe(200);
    expect((await post(valid, ip)).status).toBe(429);
  });

  it('does not count rejected requests against the limit', async () => {
    const ip = '192.168.8.8';
    for (let i = 0; i < 5; i++) expect((await post({ ...valid, email: 'nope' }, ip)).status).toBe(400);
    expect((await post(valid, ip)).status).toBe(200);
  });
});
