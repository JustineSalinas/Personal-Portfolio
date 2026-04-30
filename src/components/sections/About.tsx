import { portfolioData } from "@/data";
import { Card } from "@/components/ui/Card";

export function About() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <Card className="bg-zinc-900/30 border-zinc-800/50 p-10 rounded-2xl h-full">
        <h3 className="text-3xl font-bold mb-8 text-white">About</h3>
        <p className="text-zinc-400 leading-relaxed text-lg">
          {portfolioData.personal.bio}
        </p>
      </Card>
      
      <Card className="bg-zinc-900/30 border-zinc-800/50 p-10 rounded-2xl h-full">
        <h3 className="text-3xl font-bold mb-8 text-white">My Path - Data Engineering</h3>
        <p className="text-zinc-400 leading-relaxed text-lg">
          {portfolioData.personal.philosophy}
        </p>
      </Card>
    </div>
  );
}
