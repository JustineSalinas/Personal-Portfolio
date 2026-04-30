export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-zinc-800/50 text-zinc-300 text-xs px-3 py-1.5 rounded-full border border-zinc-700/50 whitespace-nowrap">
      {children}
    </span>
  );
}
