export const portfolioData = {
  personal: {
    name: "Adrian Salinas",
    initials: "AJ",
    titles: ["Full-Stack Developer", "IT Sophomore", "Aspiring Data Engineer"],
    location: "Iloilo City, Philippines",
    availability: "AVAILABLE FOR OPPORTUNITIES",
    bio: "I'm a 20-year-old developer from Iloilo building fast, accessible web tools. Recently spent three days wrestling with a rogue hydration error, but usually I'm crafting Next.js apps and navigating distributed systems. I prefer building real things over collecting buzzwords.",
    longBio: [
      "I design and build <strong class=\"text-primary font-bold\">production-grade web applications</strong> from the ground up — handling everything from system architecture and database design to polished front-end interfaces. My recent work includes a <span class=\"text-primary font-semibold\">real-time attendance management system</span> deployed for 700+ students at a university department, and an <span class=\"text-primary font-semibold\">agile workspace platform for developers</span> with PWA offline support — both shipping with Next.js, TypeScript, and Supabase.",
      "Beyond development, I bring a <em class=\"text-primary not-italic font-semibold\">strong eye for design</em> and <em class=\"text-primary not-italic font-semibold\">data-driven problem solving</em>. Whether it's crafting intuitive user experiences, engineering robust data pipelines, or <strong class=\"text-primary font-bold\">architecting scalable full-stack systems</strong>, I focus on delivering work that is both technically sound and visually refined."
    ],
    tags: ["NEXT.JS", "TYPESCRIPT", "DATA ENGINEERING", "AI / ML", "IOT", "FULL-STACK", "DISTRIBUTED SYSTEMS"],
    quickFacts: {
      status: "IT Sophomore — GWA 1.85",
      focus: "Full-Stack Dev, Data Engineering, IoT",
      lookingFor: "Internships, Part-time, Freelance",
      available: "Immediately"
    },
    contact: {
      email: "ajsalinas005@gmail.com",
      linkedin: "https://www.linkedin.com/in/adrian-justin-salinas-a4768b226/",
      github: "https://github.com/JustineSalinas",
      facebook: "https://www.facebook.com/profile.php?id=100067117067492",
      instagram: "https://www.instagram.com/a.jsalinas/",
      resume: "/ajsalinas-resume.pdf"
    }
  },
  experience: [
    {
      role: "Founder & AI Engineer",
      company: "Cascade Development Group (CDG)",
      date: "2025 – Present",
      location: "Iloilo City, Philippines",
      bullets: [
        "Running an IT solutions startup delivering web development, database architecture, and technical consulting to local clients.",
        "Architecting full-stack systems and AI-assisted tools; leading client engagements from requirements gathering through deployment.",
        "Managing sprint workflows, client deliverables, and cross-functional project timelines."
      ]
    },
    {
      role: "IT Assistant (Contract)",
      company: "Telus Corporation",
      date: "March 2023",
      location: "Iloilo City, Philippines",
      bullets: [
        "Set up, configured, and maintained computer systems and local networks to guarantee operational readiness.",
        "Delivered technical support and troubleshooting to ensure all workstations were secure, updated, and optimized for daily operations."
      ]
    },
    {
      role: "IT Support Intern",
      company: "InnovaThink Corporation Philippines",
      date: "July 2023",
      location: "Iloilo City, Philippines",
      bullets: [
        "Provided direct technical support for Windows desktop environments, resolving system configuration and software issues.",
        "Implemented and maintained endpoint security protocols, including firewall configurations and routine anti-virus deployments.",
        "Diagnosed hardware defects and coordinated scheduled system maintenance utilizing standardized procedural checklists.",
        "Assisted in the management and optimization of local network configurations."
      ]
    },
    {
      role: "Technical Support Intern",
      company: "University of San Agustin",
      date: "January 2023",
      location: "Iloilo City, Philippines",
      bullets: [
        "Deployed and configured network routers and infrastructure across multiple campus buildings to establish reliable connectivity.",
        "Built and optimized computer laboratories and office workstations, executing comprehensive cable management and hardware installations.",
        "Troubleshot and repaired CPU and peripheral defects, replacing faulty components to minimize hardware downtime.",
        "Managed IT asset infrastructure, maintaining accurate databases for software licenses and hardware inventory."
      ]
    }
  ],
  education: [
    {
      level: "College - Second Year",
      institution: "University of San Agustin",
      degree: "Bachelor of Science in Information Technology",
      date: "2024 - Present",
      achievements: [
        { role: "Head of Design", org: "CAS (College of Arts & Sciences)" },
        { role: "Mobile App Lead", org: "ITSA (IT School Organization)" },
      ]
    },
    {
      level: "SHS Grade 11 - Grade 12",
      institution: "University of San Agustin Main",
      date: "Sept 2023 - May 2024",
      achievements: [
        { role: "Vice President", org: "Grade 11" },
        { role: "President", org: "Grade 12" },
      ]
    },
    {
      level: "Grade 8 - Grade 10",
      institution: "BED University of San Agustin",
      date: "Sept 2019 - May 2022"
    },
    {
      level: "Elementary - Grade 7",
      institution: "Philippine International School in Buraydah, Saudi Arabia",
      date: "July 2010 - May 2019"
    }
  ],
  certifications: [
    {
      title: "Project Management - Waterfall & Agile",
      issuer: "Udemy",
      date: "2026",
      link: "https://www.udemy.com/certificate/UC-8d5096f4-77eb-4ad9-9efc-e24adaeb3ae3/",
      image: "/certs/pm-waterfall-agile.png"
    },
    {
      title: "Design Thinking Guide for Successful Professionals",
      issuer: "Udemy",
      date: "2025",
      link: "https://www.udemy.com/certificate/UC-cca1f8fe-aa32-49c9-86ca-9f3e8bb7f8ab/",
      image: "/certs/design-thinking.png"
    },
    {
      title: "Project Management 101 - Dual Certificate",
      issuer: "Udemy",
      date: "2025",
      link: "https://www.udemy.com/certificate/UC-973a419c-1ea4-45ef-b8a2-028d7f847d9e/",
      image: "/certs/pm-dual.png"
    },
    {
      title: "Certificate of Completion in IT Operations",
      issuer: "InnovaThink Corporation",
      date: "2024",
      link: "/certs/it-operations.pdf",
      image: "/certs/it-operations.png"
    }
  ],
  projects: [
    {
      title: "Solmate",
      oneLiner: "Financial & telemetry dashboard for E-Bangka",
      year: "2026",
      role: "Solo Developer",
      description: "A web-based financial and telemetry dashboard acting as the digital brain for the E-Bangka. Built in under 3 days for the Nexus Philippines Hackathon 2026, integrating real-time IoT feeds and geospatial mapping to bridge hardware data with capital planning.",
      techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Recharts", "MapLibre GL"],
      github: "https://github.com/JustineSalinas/E-Ferry",
      demo: "https://e-ferry.vercel.app",
      image: "/projects/solmate.png",
      badge: "1st Runner Up — Hackathon"
    },
    {
      title: "PharmaTrack",
      oneLiner: "University Pharmacy Attendance System",
      year: "2026",
      role: "Project Manager & Lead Developer",
      description: "A QR-based attendance tracking system deployed for the University of San Agustin Pharmacy Department. Supports 700+ students with role-based access (Student/Faculty/Admin), real-time analytics dashboards, and zero physical hardware dependencies.",
      techStack: ["Next.js", "TypeScript", "Supabase", "PostgreSQL"],
      github: "https://github.com/JustineSalinas/PharmaTrack",
      image: "/projects/pharmatrack.png"
    },
    {
      title: "Commit",
      oneLiner: "Agile workspace & productivity platform",
      year: "2026",
      role: "Solo Developer",
      description: "An agile workspace for developers combining a Markdown code journal, Pomodoro focus sessions, and sprint task management. Features PWA offline support and real-time collaboration built with Next.js 15, Supabase, and Clerk.",
      techStack: ["Next.js 15", "TypeScript 5", "Supabase", "PostgreSQL", "Clerk"],
      github: "https://github.com/JustineSalinas/Commit",
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
      github: "https://github.com/JustineSalinas/famly-app",
      image: "/projects/famly.png"
    },
    {
      title: "SignSync",
      oneLiner: "Real-time sign language translation",
      year: "2026",
      role: "Solo Developer",
      description: "An innovative tool that translates sign language into text/speech in real-time using computer vision and AI models — making communication accessible without specialized hardware.",
      techStack: ["React.js", "Python 3", "FastAPI", "MediaPipe", "Gemini API"],
      github: "https://github.com/JustineSalinas/SignSync",
      image: "/projects/signsync.png"
    },
    {
      title: "BinSense",
      oneLiner: "Smart waste bin monitoring — IoT",
      year: "2024",
      role: "Project Manager",
      description: "An IoT-based waste management solution that monitors bin fill levels using ultrasonic sensors and optimizes collection routes in real time via a web dashboard.",
      techStack: ["Arduino UNO", "Python", "ESP8266", "Sensors"],
      github: "https://github.com/JustineSalinas/BinSense",
      images: ["/projects/binsense1.jpg", "/projects/binsense2.jpg"]
    }
  ],
  techStack: {
    "Frontend": ["HTML5", "CSS3", "TypeScript", "React", "Next.js", "Tailwind CSS"],
    "Backend": ["Node.js", "Express", "Python", "Java", "FastAPI", "PHP"],
    "Database": ["Supabase", "PostgreSQL", "MySQL", "Firebase"],
    "Auth & BaaS": ["Clerk", "Supabase Auth"],
    "Developer Tools": ["Git", "GitHub", "Figma", "Notion", "Vercel"]
  }
};
