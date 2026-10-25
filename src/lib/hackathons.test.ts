import { describe, expect, it } from 'vitest';
import { portfolioData } from '@/data';
import { hackathons, isProject, type HackathonEvent } from '@/lib/hackathons';

describe('hackathons', () => {
  it('includes every standalone event', () => {
    for (const event of portfolioData.hackathonEvents) {
      expect(hackathons).toContain(event);
    }
  });

  it('includes only projects whose badge names a hackathon', () => {
    const projects = hackathons.filter(isProject);
    expect(projects.length).toBeGreaterThan(0);
    for (const project of projects) {
      expect('badge' in project && project.badge).toMatch(/hackathon/i);
    }
  });

  it('keeps the FlyRank capstone out of the list', () => {
    expect(hackathons.some((h) => h.title === 'Usage Metering & Billing Engine')).toBe(false);
  });

  it('includes the Hack Iloilo entry (Gilayon)', () => {
    const entry = hackathons.find((h) => h.title === 'Gilayon');
    expect(entry).toBeDefined();
    expect(entry && 'placement' in entry && entry.placement).toMatch(/Top 8/);
  });

  it('lists the newest start date first', () => {
    const starts = hackathons.flatMap((h) => ('startDate' in h && h.startDate ? [h.startDate] : []));
    expect(starts.length).toBeGreaterThan(1);
    expect(starts).toEqual([...starts].sort((a, b) => b.localeCompare(a)));
    expect(hackathons[0].title).toBe('Gilayon');
  });

  it('tells events and projects apart', () => {
    const event: HackathonEvent = { title: 'Event', year: '2026', badge: 'BADGE' };
    expect(isProject(event)).toBe(false);
    expect(hackathons.some(isProject)).toBe(true);
  });
});
