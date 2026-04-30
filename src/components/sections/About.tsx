import { portfolioData } from "@/data";
import { Card } from "@/components/ui/Card";

export function About() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <Card className="bg-zinc-900/30 border-zinc-900 p-8 rounded-2xl h-full flex flex-col items-start text-left">
        <h3 className="text-2xl font-bold mb-6 text-white">About</h3>
        <p className="text-zinc-400 leading-relaxed text-sm">
          {portfolioData.personal.bio}
        </p>
      </Card>
      
      <Card className="bg-zinc-900/30 border-zinc-900 p-8 rounded-2xl h-full flex flex-col items-start text-left">
        <h3 className="text-2xl font-bold mb-6 text-white">My Path - Data Engineering</h3>
        <p className="text-zinc-400 leading-relaxed text-sm">
          {portfolioData.personal.philosophy}
        </p>
      </Card>
    </div>
  );
}
