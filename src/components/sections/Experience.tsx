import { portfolioData } from "@/data";

export function Experience() {
  return (
    <div className="flex flex-col gap-10">
      <h3 className="text-2xl font-bold text-white text-center">Work Experience</h3>
      
      <div className="space-y-12">
        {portfolioData.experience.map((exp, index) => (
          <div key={index} className="relative pl-10 max-w-2xl mx-auto">
            {/* Timeline Line */}
            <div className="absolute left-[5px] top-2 bottom-0 w-px bg-zinc-900" />
            
            {/* Timeline Dot */}
            <div className="absolute left-0 top-2 w-2.5 h-2.5 bg-blue-600 rounded-full ring-4 ring-zinc-950" />
            
            <div className="flex flex-col gap-2">
              <h4 className="text-lg font-bold text-white">{exp.role}</h4>
              <div className="text-xs text-zinc-500 font-bold uppercase tracking-wider">
                <span className="text-zinc-300">{exp.company}</span> &bull; {exp.year}
              </div>
              
              <p className="text-zinc-400 leading-relaxed text-sm mt-1">
                {exp.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
