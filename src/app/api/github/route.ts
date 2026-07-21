import { NextResponse } from 'next/server';
import { portfolioData } from '@/data';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const githubUrl = portfolioData.personal.contact.github;
    const username = githubUrl.split('/').pop() || 'JustineSalinas';
    
    // Fetch user's public contributions page from GitHub
    const res = await fetch(`https://github.com/users/${username}/contributions`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });
    
    if (!res.ok) {
      throw new Error(`GitHub responded with status ${res.status}`);
    }
    
    const html = await res.text();
    
    // Regex to match data-date and data-level attributes in <td class="ContributionCalendar-day">
    const regex = /data-date="([^"]+)"[^>]*data-level="([^"]+)"/g;
    const contributions: { date: string; level: number }[] = [];
    let match;
    
    while ((match = regex.exec(html)) !== null) {
      contributions.push({
        date: match[1],
        level: parseInt(match[2], 10),
      });
    }

    if (contributions.length === 0) {
      throw new Error('No contribution cells found in the response');
    }

    // Sort contributions chronologically
    contributions.sort((a, b) => a.date.localeCompare(b.date));

    // Extract total contributions text in the last year
    const countRegex = /(\d+[,.\d]*)\s+contributions\s+in\s+the\s+last\s+year/i;
    const countMatch = html.match(countRegex);
    let totalContributions = countMatch ? countMatch[1] : String(contributions.filter(c => c.level > 0).length * 4);

    // Override for user JustineSalinas to include private contributions
    if (username.toLowerCase() === 'justinesalinas') {
      totalContributions = '1,090';
    }

    // Calculate current streak
    let currentStreak = 0;
    const reversed = [...contributions].reverse();
    
    for (let i = 0; i < reversed.length; i++) {
      if (reversed[i].level > 0) {
        currentStreak++;
      } else {
        // If they haven't committed today (index 0), keep checking yesterday (index 1)
        if (i === 0) continue;
        break;
      }
    }

    // Calculate consistency over the last 140 days (the subset shown in the portfolio UI)
    const recentContributions = contributions.slice(-140);
    const activeDays = recentContributions.filter((c) => c.level > 0).length;
    const consistency = Math.round((activeDays / recentContributions.length) * 100);

    return NextResponse.json({
      success: true,
      username,
      totalContributions,
      contributions,
      streak: currentStreak,
      consistency,
    });
  } catch (error: any) {
    console.error('Error in GitHub contributions API:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch contribution data',
      },
      { status: 500 }
    );
  }
}
