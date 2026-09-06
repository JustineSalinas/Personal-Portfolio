import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft, FileText } from 'lucide-react';
import { portfolioData } from '@/data';
import { TopBar } from '@/components/profile/TopBar';
import { CursorAura } from '@/components/profile/CursorAura';
import { ResumeActions } from './ResumeActions';

const { personal } = portfolioData;
const FILE = personal.contact.resumeFile ?? '/ajsalinas-resume.pdf';

export const metadata: Metadata = {
  title: 'Resume',
  description: `Resume of ${personal.name} — ${personal.title}. Software engineering, AI systems, startup leadership, and credentials.`,
};

export default function ResumePage() {
  return (
    <main className="relative min-h-screen rail-hatch">
      <CursorAura />
      <div className="relative z-10 mx-auto min-h-screen w-full max-w-[880px] border-x border-border bg-background">
        <div className="no-print">
          <TopBar />
        </div>

        <div className="px-5 py-8 sm:px-7 sm:py-10">
          <div className="no-print">
            <Link
              href="/"
              className="group inline-flex items-center gap-1.5 text-[15px] font-medium text-secondary transition-colors hover:text-primary"
            >
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
              Back to home
            </Link>

            <div className="mt-5">
              <h1 className="font-display text-[28px] font-semibold tracking-tight text-primary sm:text-[32px]">
                Resume
              </h1>
              <p className="mt-1 text-[16px] text-secondary sm:text-[17px]">
                {personal.name} · {personal.title}
              </p>
            </div>
          </div>

          <ResumeActions pdfUrl={FILE} />

          {/* Resume Document Pages */}
          <div className="mt-8 space-y-10">
            {/* Page 1 */}
            <div>
              <div className="no-print mb-2.5 flex items-center justify-between font-mono text-[13px] text-muted">
                <span className="inline-flex items-center gap-1.5 font-medium text-secondary">
                  <FileText size={14} className="text-primary/70" /> Page 1 of 2
                </span>
                <span className="hidden sm:inline">Summary, Education & Experience</span>
              </div>

              <div
                id="page-1"
                className="print-page relative w-full overflow-hidden rounded-xl border border-border/80 bg-white shadow-xl shadow-black/5 dark:shadow-2xl dark:shadow-black/60 transition-all"
              >
                <Image
                  src="/resume-page-1.webp"
                  alt={`Resume of ${personal.name} — Page 1 (Professional Summary, Education, Work Experience)`}
                  width={2125}
                  height={2750}
                  priority
                  className="block h-auto w-full select-none"
                />
              </div>
            </div>

            {/* Page 2 */}
            <div>
              <div className="no-print mb-2.5 flex items-center justify-between font-mono text-[13px] text-muted">
                <span className="inline-flex items-center gap-1.5 font-medium text-secondary">
                  <FileText size={14} className="text-primary/70" /> Page 2 of 2
                </span>
                <span className="hidden sm:inline">Projects, Skills & Certifications</span>
              </div>

              <div
                id="page-2"
                className="print-page relative w-full overflow-hidden rounded-xl border border-border/80 bg-white shadow-xl shadow-black/5 dark:shadow-2xl dark:shadow-black/60 transition-all"
              >
                <Image
                  src="/resume-page-2.webp"
                  alt={`Resume of ${personal.name} — Page 2 (Personal Projects, Core Skills & Tools, Certifications)`}
                  width={2125}
                  height={2750}
                  loading="lazy"
                  className="block h-auto w-full select-none"
                />
              </div>
            </div>
          </div>

          {/* Deep Dive Case Studies CTA */}
          <div className="no-print mt-12 rounded-xl border border-border bg-surface p-6 text-center">
            <h2 className="font-display text-[19px] font-semibold text-primary">
              Looking for deeper technical breakdowns?
            </h2>
            <p className="mt-1.5 text-[15px] text-secondary sm:text-[16px]">
              Case studies cover full architecture diagrams, database schemas, and live demo access.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/#work"
                className="cta-solid hover-lift inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-[15px] font-medium text-background"
              >
                Explore Case Studies
              </Link>
              <Link
                href="/certifications"
                className="hover-lift inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-4 py-2 text-[15px] font-medium text-primary hover:border-primary/40 hover:bg-surface"
              >
                View Certifications
              </Link>
            </div>
          </div>

          {/* Accessible text transcript for search engine indexing & screen readers */}
          <div className="sr-only">
            <h2>Adrian Justin J. Salinas Resume Transcript</h2>
            <p>Full-Stack Developer, AI/ML Specialization, Technical Founder</p>
            <p>Email: ajsalinas005@gmail.com, Phone: +63 961 254 7821, Location: Iloilo City, Philippines</p>
            <section>
              <h3>Professional Summary</h3>
              <p>Full-stack developer specializing in AI-integrated production systems, with a track record of shipping real-world software including a QR attendance platform serving 700+ users and two national hackathon placements (2nd Place, 1st Runner-Up). Founder of Cascade Development Group (CDG), an IT solutions startup in Iloilo. Open to internships, part-time, and remote roles.</p>
            </section>
            <section>
              <h3>Education</h3>
              <p>Bachelor of Science in Information Technology - University of San Agustin (2024 - Present, 3rd Year). Cumulative GWA: 1.85. Deputy Director for Technology, AWS User Group Iloilo; Web Development Lead, ITSA; Developer, ADS.</p>
            </section>
            <section>
              <h3>Work Experience</h3>
              <p>Founder & AI Engineer at Cascade Development Group (CDG) (2026 - Present)</p>
              <p>Project Manager & Lead Developer for PharmaTrack at University of San Agustin (May - June)</p>
              <p>Solo Developer for Solmate / E-Ferry - 1st Runner-Up, Nexus Philippines Hackathon 2026 (May)</p>
              <p>AI/ML Lead for Marine-AI - 2nd Place, National AI Hackathon 2026 (July)</p>
              <p>Project Lead & Smart Contract Developer for SplitRails - Stellar APAC Hackathon 2026 (July)</p>
              <p>IT Assistant at Telus Corporation, IT Support at InnovaThink Corporation, Technical Support Intern at University of San Agustin.</p>
            </section>
            <section>
              <h3>Personal Projects</h3>
              <p>Tuon - AI-Powered Spaced-Repetition Study Platform (Solo Developer & Founder)</p>
              <p>Commit - Developer Productivity Platform (Solo Developer)</p>
              <p>Famly - Collaborative Family Financial Tracker (Solo Developer)</p>
            </section>
            <section>
              <h3>Core Skills & Tools</h3>
              <p>Languages: TypeScript, JavaScript, Python, Java, SQL, HTML5/CSS3</p>
              <p>Frameworks & Libraries: React, Next.js, Node.js, Tailwind CSS</p>
              <p>Backend & Cloud: Supabase, Firebase, PostgreSQL, MySQL, Vercel, REST APIs, Clerk</p>
              <p>AI & Automation: RAG, Prompt Engineering, ONNX, XGBoost, Gemini/Claude API</p>
            </section>
            <section>
              <h3>Certifications</h3>
              <p>AWS AI Practitioner (Udacity), AWS Foundations: Machine Learning Basics (AWS Training), RAG Strategy & Execution (Udemy), Advanced Scrum Master (Agile Enterprise), Project Management - Waterfall & Agile (Udemy), Design Thinking Guide (Udemy), IT Operations (InnovaThink).</p>
            </section>
          </div>
        </div>
      </div>

      {/* Print Stylesheet */}
      <style>{`
        @media print {
          body {
            background: white !important;
            color: black !important;
          }
          .no-print {
            display: none !important;
          }
          .print-page {
            break-after: page !important;
            page-break-after: always !important;
            border: none !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            margin: 0 !important;
            padding: 0 !important;
          }
        }
      `}</style>
    </main>
  );
}
