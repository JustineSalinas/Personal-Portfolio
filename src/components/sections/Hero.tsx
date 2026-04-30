import { portfolioData } from "@/data";
import { Card } from "@/components/ui/Card";

export function Hero() {
  return (
    <Card className="col-span-1 md:col-span-3 flex flex-col md:flex-row items-center justify-between gap-12 bg-transparent border-none ring-0 shadow-none p-0" delay={0}>
      <div className="flex-1 flex flex-col gap-6">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm font-medium text-blue-400 flex items-center gap-2">
               <span className="text-xl text-zinc-500">📍</span> {portfolioData.personal.location}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight text-white">
            {portfolioData.personal.name}
          </h1>
          
          <div className="flex flex-wrap items-center gap-2 text-xl md:text-2xl text-zinc-300 font-semibold mb-8">
            {portfolioData.personal.titles.map((title, index) => (
              <span key={index} className="flex items-center">
                {title}
                {index < portfolioData.personal.titles.length - 1 && (
                  <span className="mx-3 text-zinc-600">|</span>
                )}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <a 
            href="#projects"
            className="bg-[#89D4F7] text-black px-8 py-3 rounded-lg font-bold hover:brightness-110 transition-all shadow-lg"
          >
            View Projects
          </a>
          
          <a 
            href={`mailto:${portfolioData.personal.contact.email}`}
            className="bg-transparent text-white border border-zinc-700 px-8 py-3 rounded-lg font-bold hover:bg-zinc-800 transition-all flex items-center gap-2"
          >
            Send Email
          </a>

          <a 
            href={portfolioData.personal.contact.github} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-transparent text-white border border-zinc-700 px-8 py-3 rounded-lg font-bold hover:bg-zinc-800 transition-all flex items-center gap-2"
          >
            View GitHub
          </a>
        </div>
      </div>

      <div className="relative w-72 h-72 md:w-80 md:h-80 shrink-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent rounded-3xl -rotate-6 scale-105" />
        <img 
          src="/portrait.png" 
          alt={portfolioData.personal.name}
          className="relative w-full h-full object-cover rounded-3xl border border-zinc-800 shadow-2xl"
        />
      </div>
    </Card>
  );
}