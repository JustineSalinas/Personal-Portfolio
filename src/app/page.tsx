import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Projects } from '@/components/Projects';
import { Experience } from '@/components/Experience';
import { Education } from '@/components/Education';
import { Skills } from '@/components/Skills';
import { Footer } from '@/components/Footer';
import { ParticleBackground } from '@/components/ParticleBackground';

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <ParticleBackground />
      <Navigation />
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Education />
      <Skills />
      <Footer />
    </main>
  );
}