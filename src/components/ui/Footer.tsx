import { portfolioData } from "@/data";

export function Footer() {
  const { contact } = portfolioData.personal;

  return (
    <footer className="col-span-1 md:col-span-3 lg:col-span-4 mt-24 mb-12 pt-12 border-t border-zinc-900">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        
        <div className="flex flex-col gap-1">
          <p className="text-xs text-zinc-500 font-medium">
            &copy; {new Date().getFullYear()} Technical Portfolio
          </p>
          <p className="text-[10px] text-zinc-700 uppercase tracking-widest font-bold">Built with Precision</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8">
          <div className="flex items-center gap-6">
            <a href={contact.github} className="text-[10px] font-bold text-zinc-500 hover:text-white transition-colors uppercase tracking-wider">GitHub</a>
            <a href={contact.linkedin} className="text-[10px] font-bold text-zinc-500 hover:text-white transition-colors uppercase tracking-wider">LinkedIn</a>
            <a href={`mailto:${contact.email}`} className="text-[10px] font-bold text-zinc-500 hover:text-white transition-colors uppercase tracking-wider">Email</a>
          </div>

          <a 
            href="#" 
            className="bg-zinc-900 border border-zinc-800 text-zinc-400 px-5 py-2 rounded-lg font-bold hover:bg-zinc-800 transition-all flex items-center gap-2 text-[10px] uppercase tracking-wider"
          >
            <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Resume
          </a>
        </div>
      </div>
    </footer>
  );
}
