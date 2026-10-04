import { portfolioData } from '@/data';

export type Project = (typeof portfolioData.projects)[number];

/**
 * Projects entered in a hackathon. Matching on the badge text (rather than
 * "has any badge") keeps non-hackathon badges, like a company capstone,
 * out of the Hackathons page and its sidebar count.
 */
export const hackathons: Project[] = portfolioData.projects.filter(
  (p) => 'badge' in p && typeof p.badge === 'string' && /hackathon/i.test(p.badge)
);
