import { portfolioData } from "@/data";
import { Card } from "@/components/ui/Card";

export function Education() {
  return (
    <div className="flex flex-col gap-12">
      {/* Education Section */}
      <div>
        <h3 className="text-3xl font-bold mb-8 text-white">Education</h3>
        {portfolioData.education.map((edu, index) => (
          <Card key={index} className="bg-zinc-900/30 border-zinc-800/50 p-8 rounded-2xl">
            <h4 className="text-xl font-bold text-white mb-2">{edu.degree}</h4>
            <div className="text-zinc-400 font-medium mb-1">{edu.institution}</div>
            <div className="text-sm text-blue-400 font-semibold">{edu.status}</div>
          </Card>
        ))}
      </div>

      {/* Certifications Section */}
      <div>
        <h3 className="text-3xl font-bold mb-8 text-white">Certifications</h3>
        <ul className="space-y-6">
          {portfolioData.certifications.map((cert, index) => (
            <li key={index} className="flex items-center gap-4 group">
              <div className="bg-blue-500/10 p-2 rounded-lg border border-blue-500/20 group-hover:bg-blue-500/20 transition-all">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="#3B82F6" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <span className="text-lg font-medium text-zinc-300 group-hover:text-white transition-colors">
                {cert}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
