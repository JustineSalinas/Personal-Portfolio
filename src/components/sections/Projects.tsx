import { portfolioData } from "@/data";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export function Projects() {
  return (
    <section className="col-span-1 md:col-span-3 lg:col-span-4 mt-8">
      <h3 className="text-2xl font-bold mb-8 px-2 text-white">Featured Projects</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {portfolioData.projects.map((project, index) => (
          <Card key={index} className="flex flex-col justify-between h-full group bg-zinc-900/30 border-zinc-900 hover:border-zinc-800 transition-all duration-300 p-6 rounded-2xl relative">
            <div className="absolute top-6 right-6 text-zinc-700 group-hover:text-blue-500 transition-colors opacity-50">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
              </svg>
            </div>

            {project.badge && (
              <div className="absolute top-0 left-6 -translate-y-1/2">
                <span className="bg-blue-600 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                  {project.badge}
                </span>
              </div>
            )}

            <div>
              <h4 className="text-xl font-bold text-white mb-4 pr-10">{project.title}</h4>
              <p className="text-zinc-400 leading-relaxed mb-6 text-sm">
                {project.description}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-auto">
              {project.techStack.map((tech, i) => (
                <Badge key={i} className="bg-zinc-900/50 border-zinc-800 text-zinc-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                  {tech}
                </Badge>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
