import { NextResponse } from 'next/server';
import { portfolioData } from '@/data';

/**
 * Contribution calendar, from whichever source is available:
 *
 *  - GITHUB_TOKEN set  → GraphQL API.
 *  - no token          → scrapes the public contributions page.
 *
 * Either way the total includes private contributions only if GitHub is willing
 * to disclose them: Settings → Profile → "Include private contributions on my
 * profile" puts them on the public page too, so the scrape is usually enough.
 *
 * Numbers are always reported exactly as GitHub returns them.
 */
/** 60s: near-live without hammering GitHub — all visitors share one cached fetch. */
export const revalidate = 60;

export interface ContributionDay {
  date: string;
  level: number;
  count: number;
}

const USERNAME =
  portfolioData.personal.contact.github.split('/').filter(Boolean).pop() ?? 'JustineSalinas';

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36';

const LEVELS: Record<string, number> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

const GRAPHQL_QUERY = `
  query($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays { date contributionCount contributionLevel }
          }
        }
      }
    }
  }
`;

/** Authenticated path — includes private contributions. */
async function fromGraphQL(token: string) {
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'User-Agent': UA,
    },
    body: JSON.stringify({ query: GRAPHQL_QUERY, variables: { login: USERNAME } }),
    next: { revalidate },
  });

  if (!res.ok) throw new Error(`GitHub GraphQL responded ${res.status}`);

  const json = await res.json();
  if (json.errors?.length) throw new Error(json.errors[0].message);

  const calendar = json.data?.user?.contributionsCollection?.contributionCalendar;
  if (!calendar) throw new Error('No contribution calendar in GraphQL response');

  const days: ContributionDay[] = calendar.weeks.flatMap(
    (w: { contributionDays: { date: string; contributionCount: number; contributionLevel: string }[] }) =>
      w.contributionDays.map((d) => ({
        date: d.date,
        count: d.contributionCount,
        level: LEVELS[d.contributionLevel] ?? 0,
      }))
  );

  return { days, total: calendar.totalContributions as number, source: 'graphql' as const };
}

/** Unauthenticated fallback — reads whatever the public profile page discloses. */
async function fromScrape() {
  const res = await fetch(`https://github.com/users/${USERNAME}/contributions`, {
    headers: { 'User-Agent': UA, Accept: 'text/html' },
    next: { revalidate },
  });

  if (!res.ok) throw new Error(`GitHub responded ${res.status}`);
  const html = await res.text();

  const counts = new Map<string, number>();
  for (const m of html.matchAll(/<tool-tip[^>]*for="([^"]+)"[^>]*>(.*?)<\/tool-tip>/g)) {
    const text = m[2].replace(/<[^>]+>/g, '').trim();
    const n = text.match(/^([\d,]+)\s+contribution/i);
    counts.set(m[1], n ? parseInt(n[1].replace(/,/g, ''), 10) : 0);
  }

  const days: ContributionDay[] = [];
  for (const m of html.matchAll(/<td[^>]*data-date="([^"]+)"[^>]*>/g)) {
    const tag = m[0];
    const id = tag.match(/id="([^"]+)"/)?.[1] ?? '';
    days.push({
      date: m[1],
      level: Number(tag.match(/data-level="(\d+)"/)?.[1] ?? 0),
      count: counts.get(id) ?? 0,
    });
  }

  if (days.length === 0) throw new Error('No contribution cells found');

  const headerTotal = html.match(/([\d,]+)\s+contributions\s+in\s+the\s+last\s+year/i)?.[1];
  const total = headerTotal
    ? parseInt(headerTotal.replace(/,/g, ''), 10)
    : days.reduce((sum, d) => sum + d.count, 0);

  return { days, total, source: 'scrape' as const };
}

export async function GET() {
  const token = process.env.GITHUB_TOKEN;

  try {
    let result;
    if (token) {
      try {
        result = await fromGraphQL(token);
      } catch (err) {
        // A bad or expired token shouldn't blank the section.
        console.warn('[api/github] GraphQL failed, falling back to scrape:', err);
        result = await fromScrape();
      }
    } else {
      result = await fromScrape();
    }

    const days = [...result.days].sort((a, b) => a.date.localeCompare(b.date));

    let longestStreak = 0;
    let run = 0;
    for (const d of days) {
      run = d.count > 0 ? run + 1 : 0;
      if (run > longestStreak) longestStreak = run;
    }

    let currentStreak = 0;
    for (let i = days.length - 1; i >= 0; i--) {
      // Today may legitimately be empty this early in the day; don't break on it.
      if (days[i].count === 0) {
        if (i === days.length - 1) continue;
        break;
      }
      currentStreak++;
    }

    return NextResponse.json({
      success: true,
      username: USERNAME,
      total: result.total,
      source: result.source,
      days,
      longestStreak,
      currentStreak,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[api/github] contribution fetch failed:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Fetch failed' },
      { status: 502 }
    );
  }
}
