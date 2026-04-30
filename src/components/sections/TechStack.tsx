"use client";

import { portfolioData } from "@/data";
import { Card } from "@/components/ui/Card";

export function TechStack() {
  return (
    <div className="flex flex-col gap-10 mt-12">
      <h3 className="text-2xl font-bold text-white text-center">Tech Stack</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(portfolioData.tech).map(([category, skills], index) => (
          <Card key={category} className="bg-zinc-900/30 border-zinc-900 p-6 rounded-xl flex flex-col gap-4" delay={0.1 * index}>
            <h4 className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest text-center border-b border-zinc-800/50 pb-2">
              {category}
            </h4>
            <div className="flex flex-wrap justify-center gap-2">
              {skills.map((tech: string, i: number) => (
                <span 
                  key={i} 
                  className="bg-zinc-900/50 border border-zinc-800/50 text-zinc-400 text-[11px] px-3 py-1.5 rounded-md font-bold uppercase tracking-tight hover:text-white transition-all"
                >
                  {tech}
                </span>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}