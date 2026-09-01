import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { portfolioData } from '@/data';
import { TopBar } from '@/components/profile/TopBar';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { Section } from '@/components/profile/Section';
import { LeadershipList } from '@/components/profile/LeadershipList';
import { ExperienceList } from '@/components/profile/ExperienceList';
import { WorkGrid } from '@/components/profile/WorkGrid';
import { BuildingNow } from '@/components/profile/BuildingNow';
import { GithubHeatmap } from '@/components/profile/GithubHeatmap';
import { HackathonList } from '@/components/profile/HackathonList';
import { StackGrid } from '@/components/profile/StackGrid';
import { EducationList } from '@/components/profile/EducationList';
import { Testimonials } from '@/components/profile/Testimonials';
import { ConnectFooter } from '@/components/profile/ConnectFooter';
import { CursorAura } from '@/components/profile/CursorAura';

export default function Home() {
  return (
    // The hatched page acts as a rail; everything readable sits in one 660px column.
    <main className="relative min-h-screen rail-hatch">
      <CursorAura />
      {/* relative z-10: the column is opaque, so it occludes the aura and the
          light is only ever visible in the rails beside it. */}
      <div className="relative z-10 mx-auto min-h-screen w-full max-w-[880px] border-x border-border bg-background">
        <TopBar />
        <ProfileHeader />

        <div className="px-7 pb-20">
          <Section id="leadership" label="Leadership & Community">
            <LeadershipList />
          </Section>

          <Section id="experience" label="Professional Experience">
            <ExperienceList />
          </Section>

          <Section
            id="work"
            label="Proof of Work"
            action={
              <span className="text-[16px] text-secondary">
                <span className="font-medium text-primary">
                  {portfolioData.personal.projectsBuilt}
                </span>{' '}
                projects built
              </span>
            }
          >
            <WorkGrid />
          </Section>

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

          <Section
            id="hackathons"
            label="Hackathons & Awards"
            intro={portfolioData.personal.awards.summary}
          >
            <HackathonList />
          </Section>

          <Section
            id="stack"
            label="Stack I use"
            intro="Technologies I work with to build products that solve real problems."
          >
            <StackGrid />
          </Section>

          {/* Demoted from a full section: eight self-paced certificates carried
              more visual weight than two national hackathon placements. */}
          <Section id="certifications" label="Certifications">
            <Link
              href="/certifications"
              className="hover-lift group inline-flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-3 text-[16px] text-secondary hover:border-primary/30 hover:bg-surface"
            >
              <span className="font-medium text-primary">
                {portfolioData.certifications.length} certifications
              </span>
              <span>in AI, cloud, agile, and project management</span>
              <ArrowUpRight size={16} className="hover-arrow text-muted" />
            </Link>
          </Section>

          <Section id="education" label="Education">
            <EducationList />
          </Section>

          {/* Social proof immediately before the ask. Renders nothing while
              portfolioData.testimonials is empty. */}
          {portfolioData.testimonials.length > 0 && (
            <Section id="testimonials" label="What people say">
              <Testimonials />
            </Section>
          )}

          <div className="pt-16">
            <ConnectFooter />
          </div>
        </div>
      </div>
    </main>
  );
}
