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

const isOngoing = (h: Hackathon) => 'ongoing' in h && h.ongoing === true;
const startOf = (h: Hackathon) => ('startDate' in h && h.startDate) || '';

/**
 * Newest first, independent of where an entry sits in the data file: events
 * still in progress lead, then entries by start date (latest first), then any
 * entry with no known start date, in file order.
 */
export const hackathons: Hackathon[] = [...portfolioData.hackathonEvents, ...projectHackathons]
  .map((hackathon, index) => ({ hackathon, index }))
  .sort((a, b) => {
    const ongoingA = isOngoing(a.hackathon);
    const ongoingB = isOngoing(b.hackathon);
    if (ongoingA !== ongoingB) return ongoingA ? -1 : 1;

    const startA = startOf(a.hackathon);
    const startB = startOf(b.hackathon);
    if (startA && startB) return startB.localeCompare(startA);
    if (startA) return -1;
    if (startB) return 1;
    return a.index - b.index;
  })
  .map(({ hackathon }) => hackathon);
