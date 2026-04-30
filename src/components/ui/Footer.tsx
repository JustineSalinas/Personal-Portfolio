import { portfolioData } from "@/data";

export function Footer() {
  const { contact } = portfolioData.personal;

  return (
    <footer className="col-span-1 md:col-span-3 lg:col-span-4 mt-24 mb-12 pt-12 border-t border-zinc-800/50">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        
        <div className="flex flex-col gap-2 text-center md:text-left">
          <div className="text-xl font-black text-white tracking-tighter">ARCHITECT.IO</div>
          <p className="text-sm text-zinc-500">
            &copy; {new Date().getFullYear()} Technical Architect Portfolio. Built with precision.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8">
          <div className="flex items-center gap-6">
            <a href={contact.github} className="text-sm font-bold text-zinc-400 hover:text-white transition-colors">GitHub</a>
            <a href={contact.linkedin} className="text-sm font-bold text-zinc-400 hover:text-white transition-colors">LinkedIn</a>
            <a href={contact.twitter} className="text-sm font-bold text-zinc-400 hover:text-white transition-colors">Twitter</a>
            <a href={`mailto:${contact.email}`} className="text-sm font-bold text-zinc-400 hover:text-white transition-colors">Email</a>
          </div>

          <a 
            href="#" 
            className="bg-[#0F172A] border border-zinc-800 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-zinc-800 transition-all flex items-center gap-2"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Download Resume
          </a>
        </div>
      </div>
    </footer>
  );
}
