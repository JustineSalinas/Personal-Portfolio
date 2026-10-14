import { describe, expect, it } from 'vitest';
import { portfolioData } from '@/data';
import { hackathons, isProject } from '@/lib/hackathons';

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

  it('lists standalone events before projects', () => {
    const firstProject = hackathons.findIndex(isProject);
    const lastEvent = hackathons.map(isProject).lastIndexOf(false);
    expect(lastEvent).toBeLessThan(firstProject);
  });

  it('tells events and projects apart', () => {
    expect(isProject(hackathons[0])).toBe(false);
    expect(isProject(hackathons[hackathons.length - 1])).toBe(true);
  });
});
