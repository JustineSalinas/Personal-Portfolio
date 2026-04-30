import { portfolioData } from "@/data";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-zinc-900">
      <div className="max-w-5xl mx-auto px-4 md:px-8 h-16 flex items-center justify-center relative">
        <nav className="flex items-center gap-6 md:gap-10">
          <a href="#about" className="text-xs md:text-sm font-bold text-blue-400 border-b-2 border-blue-400 pb-1">About</a>
          <a href="#projects" className="text-xs md:text-sm font-bold text-zinc-400 hover:text-white transition-colors">Project</a>
          <a href="#experience" className="text-xs md:text-sm font-bold text-zinc-400 hover:text-white transition-colors">Experience</a>
          <a href="#tech" className="text-xs md:text-sm font-bold text-zinc-400 hover:text-white transition-colors">Tech Stack</a>
        </nav>
        
        <a 
          href={`mailto:${portfolioData.personal.contact.email}`}
          className="absolute right-4 md:right-8 border border-blue-500/30 text-blue-400 px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-500/10 transition-all"
        >
          Contact
        </a>
      </div>
    </header>
  );
}
