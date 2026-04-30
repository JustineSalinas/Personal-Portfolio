import { portfolioData } from "@/data";
import { Card } from "@/components/ui/Card";

export function Hero() {
  return (
    <section className="flex flex-col items-center text-center gap-10 py-10">
      <div className="flex flex-col items-center gap-6 max-w-3xl">
        <div className="flex items-center gap-2">
          <span className="text-xs md:text-sm font-bold text-blue-500 uppercase tracking-widest flex items-center gap-2">
             <span className="text-lg opacity-60">📍</span> {portfolioData.personal.location}
          </span>
        </div>
        
        <h1 className="text-3xl md:text-5xl font-black mb-2 tracking-tight text-white">
          {portfolioData.personal.name}
        </h1>
        
        <div className="flex flex-wrap justify-center items-center gap-2 text-lg md:text-xl text-zinc-400 font-medium">
          {portfolioData.personal.titles.map((title, index) => (
            <span key={index} className="flex items-center">
              {title}
              {index < portfolioData.personal.titles.length - 1 && (
                <span className="mx-2 text-zinc-800">/</span>
              )}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-4">
          <a 
            href="#projects"
            className="bg-blue-600 text-white px-8 py-2.5 rounded-lg font-bold hover:bg-blue-500 transition-all shadow-lg text-sm"
          >
            View Projects
          </a>
          
          <a 
            href={`mailto:${portfolioData.personal.contact.email}`}
            className="bg-transparent text-zinc-300 border border-zinc-800 px-8 py-2.5 rounded-lg font-bold hover:bg-zinc-900 transition-all text-sm"
          >
            Send Email
          </a>

          <a 
            href={portfolioData.personal.contact.github} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-transparent text-zinc-300 border border-zinc-800 px-8 py-2.5 rounded-lg font-bold hover:bg-zinc-900 transition-all text-sm"
          >
            View GitHub
          </a>
        </div>
      </div>

      <div className="relative w-48 h-48 md:w-56 md:h-56">
        <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-2xl" />
        <img 
          src="/portrait.png" 
          alt={portfolioData.personal.name}
          className="relative w-full h-full object-cover rounded-full border-2 border-zinc-900 shadow-2xl grayscale hover:grayscale-0 transition-all duration-500"
        />
      </div>
    </section>
  );
}