import { portfolioData } from "@/data";
import { Card } from "@/components/ui/Card";

export function Education() {
  return (
    <div className="flex flex-col gap-10">
      {/* Education Section */}
      <div>
        <h3 className="text-2xl font-bold mb-6 text-white text-center">Academic Education</h3>
        <div className="space-y-6">
          {portfolioData.education.map((edu, index) => (
            <Card key={index} className="bg-zinc-900/20 border-zinc-900 p-6 rounded-xl hover:border-zinc-800 transition-all">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
                <h4 className="text-lg font-bold text-white">{edu.degree}</h4>
                <span className="text-xs font-bold text-blue-500 bg-blue-500/5 px-3 py-1 rounded-full border border-blue-500/10 whitespace-nowrap">
                  {edu.year}
                </span>
              </div>
              <div className="text-zinc-300 font-medium text-sm mb-1">{edu.institution}</div>
              {edu.location && (
                <div className="text-xs text-zinc-500 flex items-start gap-1">
                  <span className="opacity-50">📍</span> {edu.location}
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>

      {/* Certifications Section */}
      <div>
        <h3 className="text-2xl font-bold mb-6 text-white text-center">Certifications</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {portfolioData.certifications.map((cert, index) => (
            <div key={index} className="flex items-center gap-3 group bg-zinc-900/30 p-4 rounded-xl border border-zinc-900 hover:border-zinc-800 transition-all">
              <div className="bg-blue-500/10 p-1.5 rounded-md border border-blue-500/20">
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="#3B82F6" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <span className="text-sm font-medium text-zinc-400 group-hover:text-white transition-colors">
                {cert}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
