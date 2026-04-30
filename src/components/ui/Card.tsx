import { cn } from "@/lib/utils";

export function Card({
  className,
  children,
  delay = 0,
}: {
  className?: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <div
      style={{ 
        animationDelay: `${delay}s`,
        animationFillMode: 'both'
      }}
      className={cn(
        "bg-zinc-900 border border-zinc-800 rounded-3xl p-6 flex flex-col animate-fade-up",
        className
      )}
    >
      {children}
    </div>
  );
}
