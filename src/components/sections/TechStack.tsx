"use client";

import { portfolioData } from "@/data";
import { Card } from "@/components/ui/Card";

export function TechStack() {
  return (
    <div className="flex flex-col gap-8 mt-12">
      <h3 className="text-3xl font-bold text-white px-2">Tech Stack</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(portfolioData.tech).map(([category, skills], index) => (
          <Card key={category} className="bg-zinc-900/30 border-zinc-800/50 p-6 rounded-2xl flex flex-col gap-4" delay={0.1 * index}>
            <h4 className="text-sm font-bold text-zinc-500 uppercase tracking-widest">
              {category}
            </h4>
            <div className="flex flex-wrap gap-2">
              {skills.map((tech: string, i: number) => (
                <span 
                  key={i} 
                  className="bg-zinc-800/50 border border-zinc-700/50 text-zinc-300 text-sm px-4 py-2 rounded-lg font-medium hover:bg-zinc-800 hover:text-white transition-all"
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