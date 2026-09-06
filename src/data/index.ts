export const portfolioData = {
  personal: {
    name: "Adrian Salinas",
    initials: "AJ",
    title: "Software & AI Engineer · Student Founder",
    location: "Iloilo City, Philippines",
    availability: "AVAILABLE FOR OPPORTUNITIES",
    bio: "Full-Stack Developer, 2x National Hackathon Winner Awardee, and IT Solutions Founder from Iloilo with a niche in technical project management and AI systems. I build with Next.js, TypeScript, Supabase, and Python.",
    longBio: [
      "I design and build <strong class=\"text-primary font-bold\">full-stack web applications</strong> end-to-end — from database architecture and system design to polished, production-ready interfaces. I work across the stack with <span class=\"text-primary font-semibold\">Next.js, TypeScript, and Supabase</span>, and integrate <span class=\"text-primary font-semibold\">AI</span> to build smarter, more capable products. My focus is on delivering work that is both technically solid and visually refined.",
      "Through <strong class=\"text-primary font-bold\">CDG (Cascade Development Group)</strong>, I provide IT solutions built on clean, thoughtful engineering. I care as much about the experience users feel as the code running behind it. Open to internships, part-time, or full-time opportunities with companies that welcome <em class=\"text-primary not-italic font-semibold\">student status</em>."
    ],
    tags: ["NEXT.JS", "TYPESCRIPT", "AI / ML", "FULL-STACK", "IOT", "STARTUP FOUNDER", "DISTRIBUTED SYSTEMS"],
    projectsBuilt: "17+",
    metrics: [
      {
        value: 17,
        suffix: "+",
        label: "Projects Built",
        description: "Full-stack apps, AI systems & IoT solutions",
      },
      {
        value: 2,
        suffix: "x",
        label: "National Hackathon Wins",
        description: "2nd Place AI Hackathon & 1st Runner-Up Nexus",
      },
      {
        value: 8,
        suffix: "+",
        label: "Certifications",
        description: "AWS, Cloud, Agile PM & AI credentials",
      },
      {
        value: 4,
        suffix: "+",
        label: "Leadership Roles",
        description: "CDG Founder & AWS UG Iloilo Deputy Director",
      },
    ],
    // Competition record, stated once so the page and the chatbot agree.
    awards: {
      summary: "2x National Hackathon Awardee, Plus Regional (APAC) Competition Experience",
      national: [
        "2nd Place out of 24 teams — National AI Hackathon 2026, National Open Professional Category (Marine-AI, Team SOLMATE, AI Lead)",
        "1st Runner-Up out of 17 teams — Nexus PH Hackathon 2026, built a high-performing IoT telemetry dashboard under a 3-day deadline (Solmate / E-Ferry)",
      ],
      regional: [
        "Stellar APAC Hackathon 2026 — Project Manager & Smart Contract Developer on SplitRails, a collaborative expense-splitting and Stellar escrow platform",
      ],
    },
    quickFacts: {
      status: "IT 3rd Year Level",
      focus: "Full-Stack Dev, AI Engineering, IoT",
      lookingFor: "Internships, Part-time, Remote",
      available: "Immediately"
    },
    contact: {
      email: "ajsalinas005@gmail.com",
      linkedin: "https://www.linkedin.com/in/adrian-justin-salinas-a4768b226/",
      github: "https://github.com/JustineSalinas",
      facebook: "https://www.facebook.com/profile.php?id=100067117067492",
      instagram: "https://www.instagram.com/a.jsalinas/",
      // `resume` points at the in-site viewer; `resumeFile` is the raw PDF.
      resume: "/resume",
      resumeFile: "/ajsalinas-resume.pdf",
      calLink: "https://cal.com/adriansalinas/15min"
    }
  },
  // Community and organisational roles, shown between the bio and experience.
  leadership: [
    {
      role: "Founder & AI Engineer",
      org: "Cascade Development Group (CDG)",
      note: "IT solutions startup",
    },
    {
      role: "Deputy Director for Technology",
      org: "AWS User Group Iloilo",
      note: "Regional AWS community chapter",
    },
    {
      role: "Web Development Lead",
      org: "ITSA",
      note: "IT School Organization, University of San Agustin",
    },
    {
      role: "Developer",
      org: "ADS",
      note: "Augustinian Developer Society",
    },
  ],
  /**
   * Real quotes only. The section renders nothing while this is empty, so the
   * page never ships a half-finished "testimonials" block.
   *
   * Shape:
   *   {
   *     quote: "He shipped the whole attendance platform in six weeks and it
   *             has not gone down since.",
   *     name: "Full Name",
   *     role: "Department Head",
   *     org: "College of Pharmacy, University of San Agustin",
   *   }
   *
   * Good people to ask: the Pharmacy Department contact who signed off on
   * PharmaTrack, the Nan Builders client, an ITSA officer, or a hackathon
   * teammate who can speak to how you work under a deadline.
   */
  testimonials: [] as {
    quote: string;
    name: string;
    role: string;
    org?: string;
  }[],
  experience: [
    {
      role: "Founder & AI Engineer",
      company: "Cascade Development Group (CDG)",
      logo: "/logos/cdg-fire-logo.png",
      date: "2026 – Present",
      location: "Iloilo City, Philippines",
      bullets: [
        "IT solutions startup delivering web development, database architecture, and technical consulting to clients across the Visayas — collaborating with a team across the full business lifecycle from scoping to deployment.",
        "Architected and shipped end-to-end client solutions using Next.js, TypeScript, Supabase, and Vercel — owning the complete stack from schema design and REST API development to polished front-end interfaces.",
        "Designed and maintained the official CDG platform (cdg-official.vercel.app) serving as a live product portfolio and active client acquisition channel.",
        "Established structured project management workflows using Notion and GitHub enabling sprint-based delivery cycles and transparent timelines across client engagements."
      ]
    },
    {
      role: "Project Manager & Lead Developer",
      company: "PharmaTrack — University of San Agustin, Pharmacy Department",
      logo: "/logos/USALOGO.png",
      date: "2026",
      location: "Iloilo City, Philippines",
      bullets: [
        "Led a full-stack QR-based attendance system for 700+ Pharmacy students — eliminating all physical hardware dependencies and replacing manual paper-based processes entirely.",
        "Built a role-based access platform with three distinct portals (Student, Faculty, Admin) using Next.js 14 App Router, Supabase Auth, and PostgreSQL with row-level security policies.",
        "Delivered a full Admin analytics dashboard with CSV/PDF export, system-wide attendance logs, and user management providing department leadership with live operational visibility."
      ]
    },
    {
      role: "Full-Stack Developer · 1st Runner-Up",
      company: "Solmate / E-Ferry — Nexus Philippines Hackathon",
      logo: "/logos/solmate.png",
      date: "May 21–23, 2026",
      location: "Philippines",
      bullets: [
        "Built E-Ferry (Solmate), a web-based financial and telemetry dashboard acting as the digital brain for the E-Bangka — bridging hardware IoT data with capital planning for electric ferry operations.",
        "Earned 1st Runner-Up at the Nexus Philippines Hackathon: Hacking the Future of Energy, competing against university-level teams with a fully functional deployed MVP in under 3 days.",
        "Integrated real-time telemetry feeds into a React/TypeScript dashboard using Recharts and MapLibre GL, demonstrating cross-domain ability across IoT, geospatial mapping, and financial analytics."
      ]
    },
    {
      role: "IT Assistant (Contract)",
      company: "Telus Corporation",
      logo: "/logos/telus.png",
      date: "March 2025",
      location: "Iloilo City, Philippines",
      bullets: [
        "Set up, configured, and maintained computer systems and local area networks to ensure operational readiness across the organization.",
        "Resolved hardware and software issues efficiently minimizing downtime and ensuring continuous productivity for end users."
      ]
    },
    {
      role: "IT Support Intern",
      company: "InnovaThink Corporation Philippines",
      logo: "/logos/innovathink.png",
      date: "July 2024",
      location: "Iloilo City, Philippines",
      bullets: [
        "Provided direct technical support for Windows desktop environments diagnosing and resolving system configuration, software, and network connectivity issues.",
        "Completed a formal Certificate of Completion in IT Operations, demonstrating professional proficiency across hardware support, system diagnostics, and network troubleshooting."
      ]
    },
    {
      role: "Technical Support Intern",
      company: "University of San Agustin",
      logo: "/logos/USALOGO.png",
      date: "January 2024",
      location: "Iloilo City, Philippines",
      bullets: [
        "Deployed and configured network routers and infrastructure across multiple campus buildings establishing reliable campus-wide connectivity.",
        "Coordinated physical infrastructure rollout across departments, developing strong skills in network topology, cable management, and IT project execution."
      ]
    }
  ],
  education: [
    {
      level: "College - Third Year",
      institution: "University of San Agustin",
      degree: "Bachelor of Science in Information Technology",
      date: "2024 - Present",
      logo: "/logos/USALOGO.png",
      achievements: [
        { role: "Head of Design", org: "CAS (College of Arts & Sciences)" },
        { role: "Web Development Lead", org: "ITSA (IT School Organization)" },
        { role: "Developer", org: "ADS (Augustinian Developer Society)" },
      ]
    },
    {
      level: "SHS Grade 11 - Grade 12",
      institution: "University of San Agustin Main",
      date: "Sept 2023 - May 2024",
      logo: "/logos/USALOGO.png",
      achievements: [
        { role: "Vice President", org: "Grade 11" },
        { role: "President", org: "Grade 12" },
      ]
    },
    {
      level: "Grade 8 - Grade 10",
      institution: "BED University of San Agustin",
      date: "Sept 2019 - May 2022",
      logo: "/logos/USALOGO.png"
    },
    {
      level: "Elementary - Grade 7",
      institution: "Philippine International School in Buraydah, Saudi Arabia",
      date: "July 2010 - May 2019",
      logo: "/logos/pisb.png"
    }
  ],
  certifications: [
    {
      title: "AWS Foundations: Machine Learning Basics",
      issuer: "AWS Training & Certification",
      date: "2026",
      categories: ["AI & ML", "Cloud & AWS", "Microcredential"],
      link: "/certs/aws-ml-basics.png",
      image: "/certs/aws-ml-basics.png",
      logo: "/certs/aws-ml-basics.png"
    },
    {
      title: "2nd Place (National) — National AI Hackathon 2026",
      issuer: "National AI Hackathon PH (Team SOLMATE / Marine-AI)",
      date: "2026",
      categories: ["Hackathon Wins", "AI & ML"],
      link: "/work/marine-ai",
      image: "/projects/national-award.jpg",
      logo: "/projects/national-award.jpg"
    },
    {
      title: "1st Runner-Up (National) — Nexus PH Hackathon 2026",
      issuer: "Nexus Philippines & DOST (Solmate / E-Ferry)",
      date: "2026",
      categories: ["Hackathon Wins", "Cloud & AWS"],
      link: "/projects/solmate-award.png",
      image: "/projects/solmate-award.png",
      logo: "/logos/solmate.png"
    },
    {
      title: "Founder & AI Engineer",
      issuer: "Cascade Development Group (CDG)",
      date: "2026 – Present",
      categories: ["Community Leadership", "Project Management"],
      link: "https://cdg-official.vercel.app",
      image: "/logos/cdg-fire-logo.png",
      logo: "/logos/cdg-fire-logo.png"
    },
    {
      title: "Deputy Director for Technology",
      issuer: "AWS User Group Iloilo",
      date: "2026 – Present",
      categories: ["Community Leadership", "Cloud & AWS"],
      link: "https://www.linkedin.com/in/adrian-justin-salinas-a4768b226/",
      image: "/certs/aws-ml-basics.png",
      logo: "/certs/aws-ml-basics.png"
    },
    {
      title: "RAG Strategy & Execution: Build Enterprise Knowledge Systems",
      issuer: "Udemy",
      date: "2026",
      categories: ["AI & ML", "Course Certificate"],
      link: "https://www.udemy.com/certificate/UC-f36bc933-c6e4-4b2a-a3a3-0058504688ea/",
      image: "/certs/ragcert.png",
      logo: "/logos/udemy.svg"
    },
    {
      title: "Advanced Scrum Master",
      issuer: "Agile Enterprise",
      date: "2026",
      categories: ["Agile & Scrum", "Project Management", "Course Certificate"],
      link: "/certs/advanced-scrum.png",
      image: "/certs/advanced-scrum.png",
      logo: "/certs/advanced-scrum.png"
    },
    {
      title: "AWS AI Practitioner",
      issuer: "Udacity - Accenture",
      date: "2026",
      categories: ["AI & ML", "Cloud & AWS", "Microcredential"],
      link: "/certs/aws-ai-practitioner.png",
      image: "/certs/aws-ai-practitioner.png",
      logo: "/certs/aws-ai-practitioner.png"
    },
    {
      title: "Web Development Lead",
      issuer: "ITSA — University of San Agustin",
      date: "2024 – Present",
      categories: ["Community Leadership", "Project Management"],
      link: "https://itsa-website-psi.vercel.app",
      image: "/logos/itsa.png",
      logo: "/logos/itsa.png"
    },
    {
      title: "Project Management - Waterfall & Agile",
      issuer: "Udemy",
      date: "2026",
      categories: ["Project Management", "Agile & Scrum", "Course Certificate"],
      link: "https://www.udemy.com/certificate/UC-8d5096f4-77eb-4ad9-9efc-e24adaeb3ae3/",
      image: "/certs/pm-waterfall-agile.png",
      logo: "/logos/udemy.svg"
    },
    {
      title: "Introduction to Large Language Models",
      issuer: "IBM SkillsBuild",
      date: "2025",
      categories: ["AI & ML", "Microcredential"],
      link: "/certs/ibm-llm.png",
      image: "/certs/ibm-llm.png",
      logo: "/certs/ibm-llm.png"
    },
    {
      title: "Design Thinking Guide for Successful Professionals",
      issuer: "Udemy",
      date: "2025",
      categories: ["Project Management", "Course Certificate"],
      link: "https://www.udemy.com/certificate/UC-cca1f8fe-aa32-49c9-86ca-9f3e8bb7f8ab/",
      image: "/certs/design-thinking.png",
      logo: "/logos/udemy.svg"
    },
    {
      title: "Project Management 101 - Dual Certificate",
      issuer: "Udemy",
      date: "2025",
      categories: ["Project Management", "Agile & Scrum", "Course Certificate"],
      link: "https://www.udemy.com/certificate/UC-973a419c-1ea4-45ef-b8a2-028d7f847d9e/",
      image: "/certs/pm-dual.png",
      logo: "/logos/udemy.svg"
    },
    {
      title: "Certificate of Completion in IT Operations",
      issuer: "InnovaThink Corporation",
      date: "2024",
      categories: ["IT Operations", "Course Certificate"],
      link: "/certs/it-operations.pdf",
      image: "/certs/it-operations.png",
      logo: "/logos/innovathink.png"
    }
  ],
  // Active work — mirrors the pinned/most-recently-pushed repos on
  // github.com/JustineSalinas. Keep `repo` and `demo` in sync with GitHub.
  building: [
    {
      name: "ITSA Website",
      logo: "/logos/itsa.png",
      role: "Project Manager",
      blurb: "Official site for the IT Student Association of the University of San Agustin, built and shipped with the org's dev team.",
      demo: "https://itsa-website-psi.vercel.app",
      repo: "https://github.com/JustineSalinas/ITSA-Website"
    },
    {
      name: "Nan Builders",
      logo: "/logos/nan-builders.png",
      blurb: "Supply chain and procurement portal for a construction materials distributor in Iloilo City — contractor quotations, live inventory, and site logistics.",
      demo: "https://nan-builders.vercel.app",
      repo: "https://github.com/JustineSalinas/Nan-Builders",
      slug: "nan-builders",
      year: "2026",
      role: "CDG · Full-Stack Developer",
      // Not a conventional stack list: these are the portal's capability
      // modules, which is how the client-facing case study frames them.
      capabilities: ["Next.js", "Quotation Engine", "Logistics Engine", "Inventory Management"],
      caseStudy: {
        summary:
          "A construction materials distributor was running contractor quotes over the phone and tracking stock on paper. The portal turns that into multi-item requests, instant bulk pricing, and live warehouse inventory.",
        sections: [
          {
            heading: "The problem",
            body: [
              "A major construction material distributor in Iloilo City relied on manual contractor quotations, phone order calls, and paper inventory tracking.",
              "The cost was not just admin time. Quotes moving at phone speed and stock levels living on paper meant material delivery delays across active job sites and stock that was uncoordinated between the warehouse and the crews depending on it.",
            ],
          },
          {
            heading: "What we built",
            body: [
              "An integrated supply chain portal. Contractors submit multi-item material requests and get instant bulk pricing estimates back, rather than waiting on a callback.",
              "From there they can track delivery fulfilment status and view real-time warehouse inventory, so the question \"is it in stock and when does it land on site\" is answered without a phone call.",
            ],
          },
          {
            heading: "Architecture",
            body: [
              "Built on Next.js, organised around three capability modules: a quotation engine for bulk pricing, a logistics engine for fulfilment tracking, and inventory management backing both with live warehouse levels.",
              "Pricing and stock share the same source of truth, which is what makes an instant quote trustworthy — a quote generated against stale inventory is worse than no quote at all.",
            ],
          },
          {
            heading: "Measurable impact",
            body: [
              "Bulk contractor quotation turnarounds are automated, job sites have live inventory visibility, and the manual order coordination bottleneck is gone.",
            ],
          },
        ],
      }
    },
    {
      name: "Tuon",
      role: "Solo Developer",
      blurb: "AI study app for Philippine Senior High School and college students — generates flashcards and quizzes from notes with SM-2 spaced repetition.",
      demo: "https://github.com/JustineSalinas/Tuon",
      repo: "https://github.com/JustineSalinas/Tuon"
    },
    {
      name: "Famly",
      logo: "/logos/famly.svg",
      role: "Solo Developer",
      blurb: "Collaborative family financial tracker for tuition assessments, savings milestones, debt ledgers, and project proposals.",
      demo: "https://famly-app.vercel.app",
      repo: "https://github.com/JustineSalinas/famly-app"
    }
  ],
  projects: [
    {
      title: "Marine-AI",
      oneLiner: "Retrofittable IoT & AI advisory system for passenger boats",
      year: "2026",
      role: "Team SOLMATE · AI Lead",
      description: "A retrofittable IoT and AI advisory system for traditional diesel fiberglass passenger boats in the Philippines. Three sensor systems feed parallel AI modules — Speed Optimization (XGBoost/ONNX), Route Optimization (gradient-boosted models), and Predictive Maintenance (PCA autoencoder) — converging on a single bridge display showing live route tracks, optimal throttle settings, and an auditable CO₂ emissions layer.",
      techStack: ["Python", "ONNX", "XGBoost", "NumPy", "Next.js", "TypeScript", "FastAPI", "IoT"],
      demo: "https://solmate-marine-ai.vercel.app",
      images: ["/projects/national-team.png", "/projects/national-award.jpg"],
      slug: "marine-ai",
      caseStudy: {
        summary:
          "Traditional diesel passenger boats in the Philippines run on the skipper's judgement alone. Marine-AI retrofits them with sensors and three AI models that turn that judgement into measurable advice — without replacing the boat.",
        sections: [
          {
            heading: "The problem",
            body: [
              "Fiberglass passenger boats are the backbone of inter-island transport in the Philippines, and almost none of them are instrumented. Fuel burn, engine health, and route choice are decided by feel. The efficient answer is usually a new vessel, which is not an answer at all for an operator running a twenty-year-old hull.",
              "So the constraint was retrofit-only: whatever we built had to bolt onto boats that already exist.",
            ],
          },
          {
            heading: "Approach",
            body: [
              "Three sensor systems feed three AI modules running in parallel, each answering a different question, and all three converge on one bridge display so the skipper reads a single screen rather than three dashboards.",
              "Speed Optimization uses XGBoost exported to ONNX for optimal throttle settings. Route Optimization uses gradient-boosted models over live track data. Predictive Maintenance uses a PCA autoencoder to flag anomalies before they become failures.",
            ],
          },
          {
            heading: "The three modules",
            body: [
              "Speed Optimization runs XGBoost exported to ONNX, producing optimal throttle settings. Route Optimization uses gradient-boosted models over live track data. Predictive Maintenance uses a PCA autoencoder — framed as anomaly detection rather than classification, since a retrofit fleet has no labelled failure history to train against.",
              "All three converge on one bridge display: live route tracks, throttle guidance, and an auditable CO₂ emissions layer, so the skipper reads a single screen instead of three dashboards.",
            ],
          },
          {
            heading: "Outcome",
            body: [
              "2nd Place out of 24 teams in the National Open Professional Category at the National AI Hackathon 2026, competing as AI Lead for Team SOLMATE. The system also produces an auditable CO₂ emissions layer, so efficiency gains can be reported rather than merely claimed.",
            ],
          },
        ],
      },
      badge: "NATIONAL AI HACKATHON 2026",
      placement: "2nd Place out of 24 teams — National Open Professional Category",
      // Team/award photos surfaced in the Hackathons & Awards section
      awardImages: ["/projects/national-team.png", "/projects/national-award.jpg"]
    },
    {
      title: "SplitRails",
      oneLiner: "Collaborative expense-splitting & Stellar escrow platform",
      year: "2026",
      role: "Project Manager & Smart Contract Developer",
      description: "A collaborative expense-splitting and invoice management platform integrated with smart-contract escrows. Built for the Stellar APAC Hackathon, utilizing the Stellar testnet and USDC. Features transparent on-chain verification, a general ledger (GL) export system for accounting tools, real-time activity tracking, and a multi-step escrow split creator.",
      techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Stellar SDK", "Recharts"],
      demo: "https://split-rails.vercel.app",
      image: "/projects/splitrails.png",
      badge: "STELLAR APAC HACKATHON",
      awardImages: ["/projects/stellar-team.jpg"]
    },
    {
      title: "PharmaTrack",
      oneLiner: "University Pharmacy Attendance System",
      year: "2026",
      role: "Project Manager & Lead Developer",
      description: "A QR-based attendance tracking system deployed for the University of San Agustin Pharmacy Department. Supports 700+ students with role-based access (Student/Faculty/Admin), real-time analytics dashboards, and zero physical hardware dependencies.",
      techStack: ["Next.js", "TypeScript", "Supabase", "PostgreSQL"],
      image: "/projects/pharmatrack.png",
      slug: "pharmatrack",
      caseStudy: {
        summary:
          "A university department was running attendance for 700+ Pharmacy students on paper. I replaced it with a QR system that needs no scanners, derives attendance status automatically, and keeps working when the Wi-Fi does not.",
        sections: [
          {
            heading: "The problem",
            body: [
              "The University of San Agustin College of Pharmacy needed a secure, hardware-free way to monitor event and class attendance across 700+ students. Manual paper rollcalls were slow, prone to cutoff errors at the boundary between late and absent, and gave faculty administrators zero real-time visibility.",
              "A scanner-based system means procurement, budget, and hardware that eventually breaks. The constraint that shaped the whole build: it had to run on devices the department already owned.",
            ],
          },
          {
            heading: "Automatic status derivation",
            body: [
              "The interesting part is not the scanning — it is what happens after. Rather than a facilitator deciding whether someone counts as late, the platform derives status (Present, Late, Absent, Incomplete) from the event time window itself.",
              "That single decision removes the cutoff errors that made the paper process unreliable, because the rule is applied identically to every scan instead of being re-judged by whoever holds the sheet.",
            ],
          },
          {
            heading: "Designing for a room with no Wi-Fi",
            body: [
              "Campus events happen in halls with unreliable connectivity, and an attendance system that fails offline fails exactly when it is needed. Scans are buffered locally in IndexedDB and synced when the connection returns, so a facilitator can keep scanning through a dead spot.",
              "This is the decision I would defend hardest. Everything else has a workaround; an offline failure during a live event does not.",
            ],
          },
          {
            heading: "Architecture",
            body: [
              "Next.js 15 and TypeScript on Supabase, with Zod validating input at the boundary, Upstash Redis for rate limiting, and Nodemailer driving email alerts. Access control is enforced with PostgreSQL row-level security rather than in application code, so a client-side bypass still cannot read another cohort's data.",
              "Three role-based portals — Student, Faculty, and Admin — plus admin approval workflows, real-time faculty dashboards, and PDF/Excel report exports for department leadership.",
            ],
          },
          {
            heading: "Measurable impact",
            body: [
              "700+ Pharmacy students onboarded at zero hardware cost. Attendance status derivation is 100% automated, replacing manual paper rollcalls entirely and giving faculty immediate roster visibility that did not previously exist.",
            ],
          },
        ],
      }
    },
    {
      title: "Solmate",
      oneLiner: "Financial & telemetry dashboard for E-Bangka",
      year: "2026",
      role: "Solo Developer",
      description: "A web-based financial and telemetry dashboard acting as the digital brain for the E-Bangka. Built in under 3 days for the Nexus Philippines Hackathon 2026, integrating real-time IoT feeds and geospatial mapping to bridge hardware data with capital planning.",
      techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Recharts", "MapLibre GL"],
      demo: "https://e-ferry.vercel.app",
      images: ["/projects/solmate.png", "/projects/solmate-team.png", "/projects/solmate-award.png"],
      badge: "NEXUS PH HACKATHON 2026",
      placement: "1st Runner-Up (National) out of 17 teams",
      awardImages: ["/projects/solmate-team.png", "/projects/solmate-award.png"]
    },
    {
      title: "Commit",
      oneLiner: "Agile workspace & productivity platform",
      year: "2026",
      role: "Solo Developer",
      description: "An agile workspace for developers combining a Markdown code journal, Pomodoro focus sessions, and sprint task management. Features PWA offline support and real-time collaboration built with Next.js 15, Supabase, and Clerk.",
      techStack: ["Next.js 15", "TypeScript 5", "Supabase", "PostgreSQL", "Clerk"],
      demo: "https://commit-beta.vercel.app",
      image: "/projects/commit.png"
    },
    {
      title: "Famly",
      oneLiner: "Collaborative Family Financial Tracker",
      year: "2026",
      role: "Solo Developer",
      description: "Designed a dark-themed PWA tracking tuition assessments, savings milestones, debt ledgers, and family project proposals — solving a real household financial visibility problem. Implemented real-time Supabase sync for multi-device collaboration with PWA offline fallback, reflecting strong product intuition and self-driven initiative.",
      techStack: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "PWA"],
      demo: "https://famly-app.vercel.app",
      image: "/projects/famly.png"
    },
    {
      title: "Tuon",
      oneLiner: "AI study companion with spaced repetition",
      year: "2026",
      role: "Solo Developer",
      description: "An AI study app for Philippine Senior High School and college students. Generates flashcards and practice quizzes from class notes via Anthropic Claude, powered by an SM-2 spaced-repetition algorithm and Firebase backend.",
      techStack: ["Next.js 16", "TypeScript", "Tailwind CSS", "Firebase", "Anthropic Claude API", "Motion"],
      demo: "https://github.com/JustineSalinas/Tuon"
    },
    {
      title: "BinSense",
      oneLiner: "Smart waste bin monitoring — IoT",
      year: "2024",
      role: "Project Manager",
      description: "An IoT-based waste management solution that monitors bin fill levels using ultrasonic sensors and optimizes collection routes in real time via a web dashboard.",
      techStack: ["Arduino UNO", "Python", "ESP8266", "Sensors"],
      images: ["/projects/binsense1.jpg", "/projects/binsense2.jpg"]
    }
  ],
  techStack: {
    "Frontend": ["HTML5", "CSS3", "TypeScript", "React", "Next.js", "Tailwind CSS"],
    "Backend": ["Node.js", "Express", "Python", "Java", "FastAPI", "PHP"],
    "Database": ["Supabase", "PostgreSQL", "MySQL", "Firebase"],
    "Auth & BaaS": ["Clerk", "Supabase Auth"],
    "AI & Automation": [
      "Cursor IDE",
      "Antigravity (Agentic IDE)",
      "Claude Code (AI-Assisted Architecture)",
      "Gemini/Claude API",
      "Prompt Engineering",
      "RAG (Retrieval-Augmented Generation)",
      "ONNX",
      "XGBoost"
    ],
    "Developer Tools": ["Git", "GitHub", "Figma", "Notion", "Vercel"]
  }
};
