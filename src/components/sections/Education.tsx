import { portfolioData } from "@/data";

export function Education() {
  return (
    <div className="flex flex-col gap-16">
      {/* Education Section */}
      <div>
        <h3 className="text-2xl font-bold mb-10 text-white">Academic Education</h3>
        <div className="space-y-12">
          {portfolioData.education.map((edu, index) => (
            <div key={index} className="relative pl-10">
              {/* Timeline Line */}
              <div className="absolute left-[5px] top-2 bottom-0 w-px bg-zinc-900" />
              
              {/* Timeline Dot */}
              <div className="absolute left-0 top-2 w-2.5 h-2.5 bg-blue-600 rounded-full ring-4 ring-zinc-950" />
              
              <div className="flex flex-col gap-2">
                <div className="text-xs font-bold text-blue-500 uppercase tracking-widest">{edu.year}</div>
                <h4 className="text-lg font-bold text-white leading-snug">{edu.degree}</h4>
                <div className="text-zinc-400 font-medium text-sm">{edu.institution}</div>
                {edu.location && (
                  <div className="text-[11px] text-zinc-600 flex items-start gap-1 mt-1">
                    <span className="opacity-40">📍</span> {edu.location}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications Section */}
      <div>
        <h3 className="text-xl font-bold mb-6 text-white">Certifications</h3>
        <div className="grid grid-cols-1 gap-4">
          {portfolioData.certifications.map((cert, index) => (
            <div key={index} className="flex items-center gap-3 group bg-zinc-900/20 p-4 rounded-xl border border-zinc-900 hover:border-zinc-800 transition-all">
              <div className="bg-blue-500/10 p-1.5 rounded-md border border-blue-500/20">
                <svg viewBox="0 0 24 24" width="14" height="14" stroke="#3B82F6" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <span className="text-sm font-medium text-zinc-500 group-hover:text-white transition-colors">
                {cert}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
