import { portfolioData } from '@/data';

export type Project = (typeof portfolioData.projects)[number];
export type HackathonEvent = (typeof portfolioData.hackathonEvents)[number];
export type Hackathon = Project | HackathonEvent;

/** Only built projects carry a tech stack, which is what opens the detail popup. */
export const isProject = (h: Hackathon): h is Project => 'techStack' in h;

/**
 * Projects entered in a hackathon. Matching on the badge text (rather than
 * "has any badge") keeps non-hackathon badges, like a company capstone,
 * out of the Hackathons page and its sidebar count.
 */
const projectHackathons: Project[] = portfolioData.projects.filter(
  (p) => 'badge' in p && typeof p.badge === 'string' && /hackathon/i.test(p.badge)
);

/** Newest first: events still in progress or without a project, then projects. */
export const hackathons: Hackathon[] = [...portfolioData.hackathonEvents, ...projectHackathons];
