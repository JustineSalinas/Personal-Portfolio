import { portfolioData } from "@/data";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Education } from "@/components/sections/Education";
import { TechStack } from "@/components/sections/TechStack";
import { Footer } from "@/components/ui/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-blue-500/30 selection:text-white font-sans">
      <Header />
      
      <div className="max-w-5xl mx-auto px-4 md:px-8 pt-32 flex flex-col gap-24">
        
        {/* Top Section: Hero */}
        <section id="hero" className="scroll-mt-32">
          <Hero />
        </section>

        {/* About & Philosophy */}
        <section id="about" className="scroll-mt-32">
          <About />
        </section>

        {/* Projects Section */}
        <section id="projects" className="scroll-mt-32">
          <Projects />
        </section>

        {/* Experience & Education Section */}
        <section id="experience" className="scroll-mt-32 grid grid-cols-1 lg:grid-cols-12 gap-24">
          <div className="lg:col-span-8">
            <Experience />
          </div>
          <div className="lg:col-span-4 flex flex-col gap-24">
            <Education />
          </div>
        </section>

        {/* Tech Stack Section */}
        <section id="tech" className="scroll-mt-32">
          <TechStack />
        </section>

        {/* Footer & Contact */}
        <Footer />

      </div>
    </main>
  );
}