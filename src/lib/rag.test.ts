import { describe, expect, it } from 'vitest';
import { formatContext, retrieve } from '@/lib/rag';

describe('retrieve', () => {
  it('returns nothing for an empty or all-stopword query', () => {
    expect(retrieve('')).toEqual([]);
    expect(retrieve('the of and')).toEqual([]);
  });

  it('finds the Marine-AI project from a hackathon question', () => {
    const hits = retrieve('Marine-AI national hackathon');
    expect(hits.length).toBeGreaterThan(0);
    expect(hits.some((c) => /Marine-AI/i.test(c.title + c.text))).toBe(true);
  });

  it('knows about the ongoing Hack Iloilo entry', () => {
    const hits = retrieve('Hack Iloilo');
    expect(hits.some((c) => /Hack Iloilo/i.test(c.text))).toBe(true);
  });

  it('honors topK', () => {
    expect(retrieve('projects built with Next.js', 3).length).toBeLessThanOrEqual(3);
  });
});

describe('formatContext', () => {
  it('renders section, title and text for each chunk', () => {
    const out = formatContext([
      { id: 'a', section: 'Projects', title: 'First', text: 'Body one' },
      { id: 'b', section: 'Awards', title: 'Second', text: 'Body two' },
    ]);
    expect(out).toBe('[Projects: First]\nBody one\n\n[Awards: Second]\nBody two');
  });
});
