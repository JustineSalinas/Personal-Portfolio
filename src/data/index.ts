export const portfolioData = {
  personal: {
    name: "Adrian Justin J. Salinas",
    initials: "AJS",
    titles: ["Full-Stack Developer", "IT Sophomore", "Aspiring Data Engineer"],
    location: "Iloilo City, Philippines",
    availability: "AVAILABLE FOR OPPORTUNITIES",
    bio: "I am an IT sophomore with a strong foundation in modern web development and a growing passion for data architecture. My focus is on building robust, scalable systems that solve real-world problems. I thrive in environments that challenge me to learn new technologies and apply them to complex scenarios.",
    longBio: [
      "I am currently a Bachelor of Science in Information Technology student at the University of San Agustin, where I've developed a deep interest in the intersection of software engineering and data science.",
      "My technical journey is driven by a passion for building efficient, user-centric applications that utilize modern stacks like Next.js, TypeScript, and various AI/ML integrations.",
      "Beyond coding, I am committed to continuous learning and professional growth, constantly seeking to refine my skills in distributed systems and data engineering.",
      "I am actively looking for internships, part-time roles, or freelance opportunities where I can contribute my skills to meaningful projects and learn from industry experts."
    ],
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
      resume: "#" // Placeholder for resume link
    }
  },
  experience: [
    {
      role: "IT Support (Internship)",
      company: "INNOVATHINK",
      date: "July 2023",
      location: "Iloilo City, Philippines",
      bullets: [
        "Provided comprehensive technical support and maintained system integrity for internal operations",
        "Handled diagnostics and troubleshooting for 50+ workstations",
        "Managed Windows desktop configurations and network setups",
        "Delivered end-user training, reducing support tickets by 30%"
      ]
    },
    {
      role: "IT Assistant (Contract)",
      company: "TELUS",
      date: "March 2023",
      location: "Iloilo City, Philippines",
      bullets: [
        "Assisted in network troubleshooting, hardware maintenance, and software deployments",
        "Configured and maintained office computer systems",
        "Provided technical support for hardware and software issues",
        "Ensured minimal system downtime through proactive maintenance"
      ]
    },
    {
      role: "Technical Support",
      company: "University of San Agustin",
      date: "Past",
      location: "Iloilo City, Philippines",
      bullets: [
        "Resolved student and faculty technical issues",
        "Managed lab equipment and supported campus IT infrastructure",
        "Maintained computer labs and provided on-site support"
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
    "Project Management",
    "Design Thinking",
    "IT Ops",
    "Tech Support"
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
    },
    {
      title: "EduSync",
      oneLiner: "Student data aggregation pipeline system",
      description: "A data pipeline system designed to aggregate and synchronize student information across multiple educational platforms.",
      techStack: ["Python", "Node.js", "Pandas", "SQLite", "FastAPI"],
      github: "https://github.com/JustineSalinas/EduSync"
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