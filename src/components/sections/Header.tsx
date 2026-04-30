import { portfolioData } from "@/data";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-zinc-800/50">
      <div className="max-w-5xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        <div className="text-xl font-black tracking-tighter text-white">
          ARCHITECT.IO
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#about" className="text-sm font-bold text-blue-400 border-b-2 border-blue-400 pb-1">About</a>
          <a href="#projects" className="text-sm font-bold text-zinc-400 hover:text-white transition-colors">Project</a>
          <a href="#experience" className="text-sm font-bold text-zinc-400 hover:text-white transition-colors">Experience</a>
          <a href="#tech" className="text-sm font-bold text-zinc-400 hover:text-white transition-colors">Tech Stack</a>
        </nav>
        
        <a 
          href={`mailto:${portfolioData.personal.contact.email}`}
          className="border border-blue-500/50 text-blue-400 px-6 py-2 rounded-lg text-sm font-bold hover:bg-blue-500/10 transition-all"
        >
          Contact
        </a>
      </div>
    </header>
  );
}
