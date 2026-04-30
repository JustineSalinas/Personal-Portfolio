import { portfolioData } from "@/data";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export function Projects() {
  return (
    <section className="col-span-1 md:col-span-3 lg:col-span-4 mt-8">
      <h3 className="text-3xl font-bold mb-8 px-2 text-white">Featured Projects</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {portfolioData.projects.map((project, index) => (
          <Card key={index} className="flex flex-col justify-between h-full group bg-zinc-900/30 border-zinc-800/50 hover:border-zinc-700 transition-all duration-300 p-8 rounded-2xl relative">
            <div className="absolute top-8 right-8 text-zinc-600 group-hover:text-blue-400 transition-colors">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
              </svg>
            </div>
            
            <div>
              <h4 className="text-2xl font-bold text-white mb-6 pr-10">{project.title}</h4>
              <p className="text-zinc-400 leading-relaxed mb-8 text-lg">
                {project.description}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3 mt-auto">
              {project.techStack.map((tech, i) => (
                <Badge key={i} className="bg-zinc-800/50 border-zinc-700 text-zinc-300 px-3 py-1 text-xs">
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
