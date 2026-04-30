import { cn } from "@/lib/utils";

export function Badge({ 
  children, 
  className 
}: { 
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={cn(
      "bg-zinc-800/50 text-zinc-300 text-xs px-3 py-1.5 rounded-full border border-zinc-700/50 whitespace-nowrap",
      className
    )}>
      {children}
    </span>
  );
}
