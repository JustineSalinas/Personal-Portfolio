export const portfolioData = {
  personal: {
    name: "Adrian Salinas",
    initials: "AJ",
    titles: ["Full-Stack Developer", "IT Sophomore", "Aspiring Data Engineer"],
    location: "Iloilo City, Philippines",
    availability: "AVAILABLE FOR OPPORTUNITIES",
    bio: "I'm a 19-year-old developer from Iloilo building fast, accessible web tools. Recently spent three days wrestling with a rogue hydration error, but usually I'm crafting Next.js apps and navigating distributed systems. I prefer building real things over collecting buzzwords.",
    longBio: [
      "I am currently a Bachelor of Science in Information Technology student at the University of San Agustin, where I've developed a deep interest in the intersection of software engineering and data science.",
      "My technical journey is driven by a passion for building efficient, user-centric applications that utilize modern stacks like Next.js, TypeScript, and various AI/ML integrations.",
      "Beyond coding, I am committed to continuous learning and professional growth, constantly seeking to refine my skills in distributed systems and data engineering.",
      "I am actively looking for internships, part-time roles, or freelance opportunities where I can contribute my skills to meaningful projects and learn from industry experts."
    ],
    tags: ["NEXT.JS", "TYPESCRIPT", "DATA ENGINEERING", "AI / ML", "IOT", "FULL-STACK", "DISTRIBUTED SYSTEMS"],
    quickFacts: {
      status: "IT Sophomore",
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
      resume: "#" // Placeholder for resume link
    }
  },
  experience: [
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
      date: "2024 - Present"
    },
    {
      level: "SHS Grade 11 - Grade 12",
      institution: "University of San Agustin Main",
      date: "Sept 2023 - May 2024"
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
      date: "2024",
      link: "https://www.udemy.com/certificate/UC-8d5096f4-77eb-4ad9-9efc-e24adaeb3ae3/",
      image: "/certs/pm-waterfall-agile.png"
    },
    {
      title: "Design Thinking Guide for Successful Professionals",
      issuer: "Udemy",
      date: "2024",
      link: "https://www.udemy.com/certificate/UC-cca1f8fe-aa32-49c9-86ca-9f3e8bb7f8ab/",
      image: "/certs/design-thinking.png"
    },
    {
      title: "Project Management 101- Project Management DUAL Certificate",
      issuer: "Udemy",
      date: "2024",
      link: "https://www.udemy.com/certificate/UC-973a419c-1ea4-45ef-b8a2-028d7f847d9e/",
      image: "/certs/pm-dual.png"
    },
    {
      title: "Certificate of Completion in IT Operations",
      issuer: "InnovaThink Corporation",
      date: "2023",
      link: "/certs/it-operations.pdf",
      image: "/certs/it-operations.png"
    }
  ],
  projects: [
    {
      title: "Commit",
      oneLiner: "Project management tool for agile teams",
      description: "A comprehensive project management tool designed to streamline agile workflows for modern development teams.",
      techStack: ["Next.js 15", "TypeScript 5", "Supabase", "PostgreSQL", "Clerk"],
      github: "https://github.com/JustineSalinas/Commit",
      demo: "https://commit-beta.vercel.app"
    },
    {
      title: "PharmaTrack",
      oneLiner: "Inventory management for small-medium pharmacies",
      description: "A dedicated inventory system that helps pharmacies manage their stock levels, expiration dates, and sales records efficiently.",
      techStack: ["Next.js", "TypeScript", "Supabase", "PostgreSQL"],
      github: "https://github.com/JustineSalinas/PharmaTrack"
    },
    {
      title: "SignSync",
      oneLiner: "Real-time sign language translation using computer vision",
      description: "An innovative tool that translates sign language into text/speech in real-time using computer vision and AI models.",
      techStack: ["React.js", "Python 3", "FastAPI", "MediaPipe", "Gemini API"],
      github: "https://github.com/JustineSalinas/SignSync"
    },
    {
      title: "BinSense",
      oneLiner: "Smart waste bin monitoring with IoT integration",
      description: "An IoT-based waste management solution that monitors bin fill levels and optimizes collection routes.",
      techStack: ["Arduino UNO", "Python", "ESP8266", "Sensors"],
      github: "https://github.com/JustineSalinas/BinSense"
    }
  ],
  techStack: {
    "Core Programming": ["Python 3", "TypeScript 5", "C++"],
    "Frontend": ["Next.js 15", "React.js", "Tailwind CSS"],
    "Backend": ["Supabase", "PostgreSQL", "FastAPI"],
    "AI / LLMs": ["MediaPipe", "Gemini API"],
    "Dev Environments": ["Vercel", "Git", "Arduino"]
  }
};