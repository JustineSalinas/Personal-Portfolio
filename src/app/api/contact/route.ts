import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { portfolioData } from '@/data';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 3;

/**
 * Per-IP throttle. In-memory, so it resets on cold start and isn't shared
 * across instances — proportionate for a portfolio form, where the goal is
 * blunting drive-by spam rather than airtight quotas. Move to Upstash Redis
 * if this ever needs to hold across the fleet.
 */
const hits = new Map<string, number[]>();

/** Read-only check. Deliberately does not record — see recordSend. */
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length === 0) hits.delete(ip);
  else hits.set(ip, recent);
  return recent.length >= MAX_PER_WINDOW;
}

/**
 * Only successful sends count against the quota. Charging for validation
 * failures would lock someone out for mistyping their own email twice.
 */
function recordSend(ip: string): void {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  // Opportunistic cleanup so the map can't grow without bound.
  if (hits.size > 500) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Email service is not configured.' },
      { status: 503 }
    );
  }

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    request.headers.get('x-real-ip') ||
    'unknown';

  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many messages. Please try again in a few minutes.' },
      { status: 429 }
    );
  }

  const resend = new Resend(apiKey);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const { name, email, message, company } = body as Record<string, unknown>;

  // Honeypot: hidden from humans, so anything in it is a bot. Return 200 so
  // the bot sees success and doesn't retry with a different shape.
  if (typeof company === 'string' && company.trim() !== '') {
    return NextResponse.json({ ok: true });
  }

  if (
    typeof name !== 'string' ||
    typeof email !== 'string' ||
    typeof message !== 'string'
  ) {
    return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
  }

  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedMessage = message.trim();

  if (!trimmedName || !trimmedEmail || !trimmedMessage) {
    return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
  }

  if (!EMAIL_RE.test(trimmedEmail)) {
    return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
  }

  if (trimmedName.length > 100 || trimmedEmail.length > 254 || trimmedMessage.length > 5000) {
    return NextResponse.json({ error: 'One or more fields are too long.' }, { status: 400 });
  }

  const to =
    process.env.CONTACT_TO_EMAIL ?? portfolioData.personal.contact.email;
  const from =
    process.env.CONTACT_FROM_EMAIL ??
    `${portfolioData.personal.name} <onboarding@resend.dev>`;

  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: trimmedEmail,
    subject: `Portfolio message from ${trimmedName}`,
    text: [
      `Name: ${trimmedName}`,
      `Email: ${trimmedEmail}`,
      '',
      trimmedMessage,
    ].join('\n'),
  });

  if (error) {
    console.error('[contact]', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }

  recordSend(ip);
  return NextResponse.json({ ok: true });
}
