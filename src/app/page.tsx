import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Projects } from '@/components/Projects';
import { Experience } from '@/components/Experience';
import { Education } from '@/components/Education';
import { Certifications } from '@/components/Certifications';
import { Skills } from '@/components/Skills';
import { Footer } from '@/components/Footer';
import { SubtleBackground } from '@/components/SubtleBackground';

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <SubtleBackground />
      <Navigation />
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Education />
      <Certifications />
      <Skills />
      <Footer />
    </main>
  );
}