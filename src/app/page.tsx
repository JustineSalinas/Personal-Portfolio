import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { CDGShowcase } from '@/components/CDGShowcase';
import { About } from '@/components/About';
import { Projects } from '@/components/Projects';
import { Experience } from '@/components/Experience';
import { Education } from '@/components/Education';
import { Certifications } from '@/components/Certifications';
import { Skills } from '@/components/Skills';
import { Footer } from '@/components/Footer';
import { SubtleBackground } from '@/components/SubtleBackground';
import { MusicPlayer } from '@/components/MusicPlayer';

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <SubtleBackground />
      <Navigation />
      <Hero />
      <CDGShowcase />
      <About />
      <Projects />
      <Experience />
      <section className="section-padding px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <Education />
          <Certifications />
        </div>
      </section>
      <Skills />
      <Footer />
      <MusicPlayer />
    </main>
  );
}