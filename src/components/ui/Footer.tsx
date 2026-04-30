import { portfolioData } from "@/data";

export function Footer() {
  const { contact } = portfolioData.personal;

  return (
    <footer className="col-span-1 md:col-span-3 lg:col-span-4 mt-24 mb-12 pt-12 border-t border-zinc-900">
      <div className="flex flex-col items-center gap-8 text-center">
        
        <div className="flex flex-col gap-2">
          <p className="text-sm text-zinc-500">
            &copy; {new Date().getFullYear()} Technical Architect Portfolio. Built with precision.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6">
          <a href={contact.github} className="text-xs font-bold text-zinc-400 hover:text-white transition-colors">GitHub</a>
          <a href={contact.linkedin} className="text-xs font-bold text-zinc-400 hover:text-white transition-colors">LinkedIn</a>
          <a href={contact.twitter} className="text-xs font-bold text-zinc-400 hover:text-white transition-colors">Twitter</a>
          <a href={`mailto:${contact.email}`} className="text-xs font-bold text-zinc-400 hover:text-white transition-colors">Email</a>
        </div>

        <a 
          href="#" 
          className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-6 py-2 rounded-lg font-bold hover:bg-zinc-800 transition-all flex items-center gap-2 text-xs"
        >
          <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          Download Resume
        </a>
      </div>
    </footer>
  );
}
