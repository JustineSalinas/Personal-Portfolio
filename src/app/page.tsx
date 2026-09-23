import { TopBar } from '@/components/profile/TopBar';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { Section } from '@/components/profile/Section';
import { Sidebar } from '@/components/profile/Sidebar';
import { BuildingNow } from '@/components/profile/BuildingNow';
import { GithubHeatmap } from '@/components/profile/GithubHeatmap';
import { ConnectFooter } from '@/components/profile/ConnectFooter';

// Home stays minimal — every category with real content (Projects,
// Experience, Stack, Certifications, Recommendations, Affiliations,
// Resources) already has its own page linked from the sidebar. Repeating a
// preview of each here was what made the page feel cluttered.
export default function Home() {
  return (
    <main className="relative min-h-screen bg-page">
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1160px] justify-center gap-6 px-0 lg:px-6">
        <Sidebar />

        <div className="w-full max-w-[880px] border-x border-border bg-background">
          <TopBar />
          <ProfileHeader />

          <div className="px-7 pb-20">
            <Section id="building" label="Currently Building">
              <BuildingNow />
            </Section>

            <Section
              id="github"
              label="GitHub Contributions"
              action={
                <a
                  href="https://github.com/JustineSalinas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[16px] font-medium text-secondary transition-colors hover:text-primary"
                >
                  @JustineSalinas →
                </a>
              }
            >
              <GithubHeatmap />
            </Section>

            <div className="pt-16">
              <ConnectFooter />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
