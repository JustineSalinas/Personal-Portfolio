import Link from 'next/link';
import { Sidebar } from '@/components/profile/Sidebar';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { Section } from '@/components/profile/Section';
import { ExperienceList } from '@/components/profile/ExperienceList';
import { ProjectsPreview } from '@/components/profile/ProjectsPreview';
import { StackPreview } from '@/components/profile/StackPreview';
import { ToolsPreview } from '@/components/profile/ToolsPreview';
import { GithubHeatmap } from '@/components/profile/GithubHeatmap';
import { HomeFooter } from '@/components/profile/HomeFooter';

/**
 * Home shell: a fixed left sidebar as its own floating card, then a
 * narrow 640px reading column centered in the remaining viewport
 * — directly matching marwieang.com's layout. Sections run top to
 * bottom in his order: hero → Experience → Projects → Stack → GitHub,
 * each a quiet H2 label with the content underneath.
 */
export default function Home() {
  return (
    <main className="relative min-h-screen bg-page">
      <Sidebar />

      <div className="mx-auto w-full max-w-[640px] px-6 pb-10 pt-[84px] lg:pl-6 lg:pr-6 lg:pt-10">
        <ProfileHeader />

        <Section id="experience" label="Experience">
          <ExperienceList limit={2} />
          <div className="mt-6">
            <Link
              href="/experience"
              className="text-[14px] font-medium text-muted hover:text-primary"
            >
              View all →
            </Link>
          </div>
        </Section>

        <Section id="projects" label="Projects">
          <ProjectsPreview />
        </Section>

        <Section id="tools" label="Tools I use">
          <ToolsPreview />
        </Section>

        <Section
          id="stack"
          label="Stack"
          action={
            <Link
              href="/stack"
              className="text-[14px] font-medium text-muted hover:text-primary"
            >
              View all
            </Link>
          }
        >
          <StackPreview />
        </Section>

        <GithubHeatmap />

        <HomeFooter />
      </div>
    </main>
  );
}
