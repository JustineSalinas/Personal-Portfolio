import { portfolioData } from "@/data";

export function Experience() {
  return (
    <div className="flex flex-col gap-8">
      <h3 className="text-3xl font-bold text-white px-2">Experience</h3>
      
      <div className="space-y-12">
        {portfolioData.experience.map((exp, index) => (
          <div key={index} className="relative pl-10">
            {/* Timeline Line */}
            <div className="absolute left-[5px] top-2 bottom-0 w-0.5 bg-zinc-800" />
            
            {/* Timeline Dot */}
            <div className="absolute left-0 top-2 w-3 h-3 bg-blue-500 rounded-full ring-4 ring-zinc-950 shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
            
            <div className="flex flex-col gap-2">
              <h4 className="text-xl font-bold text-white">{exp.role}</h4>
              <div className="text-sm text-zinc-500 font-medium">
                <span className="text-zinc-300">{exp.company}</span> &bull; {exp.year}
              </div>
              
              <p className="text-zinc-400 leading-relaxed text-lg mt-2">
                {exp.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
