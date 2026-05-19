export const portfolioData = {
  personal: {
    name: "Adrian Salinas",
    initials: "AJ",
    titles: ["Full-Stack Developer", "IT Sophomore", "Aspiring Data Engineer"],
    location: "Iloilo City, Philippines",
    availability: "AVAILABLE FOR OPPORTUNITIES",
    bio: "I'm a 19-year-old developer from Iloilo building fast, accessible web tools. Recently spent three days wrestling with a rogue hydration error, but usually I'm crafting Next.js apps and navigating distributed systems. I prefer building real things over collecting buzzwords.",
    longBio: [
      "I design and build production-grade web applications from the ground up — handling everything from system architecture and database design to polished front-end interfaces. My recent work includes a real-time attendance management system deployed for a university department and an interactive platform tailored for developers who want to learn and level up their skills, both shipping with Next.js, TypeScript, and Supabase.",
      "Beyond development, I bring a strong eye for design and data-driven problem solving. Whether it's crafting intuitive user experiences, engineering robust data pipelines, or architecting scalable full-stack systems, I focus on delivering work that is both technically sound and visually refined."
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
      oneLiner: "Interactive learning platform for developers",
      description: "A comprehensive platform designed to help developers learn, collaborate, and streamline their workflow efficiently.",
      techStack: ["Next.js 15", "TypeScript 5", "Supabase", "PostgreSQL", "Clerk"],
      github: "https://github.com/JustineSalinas/Commit",
      demo: "https://commit-beta.vercel.app",
      image: "/projects/commit.png"
    },
    {
      title: "PharmaTrack",
      oneLiner: "Official Pharmacy Attendance Management System",
      description: "A professional QR-based attendance tracking monitoring system developed exclusively for the University of San Agustin Pharmacy Department.",
      techStack: ["Next.js", "TypeScript", "Supabase", "PostgreSQL"],
      github: "https://github.com/JustineSalinas/PharmaTrack",
      image: "/projects/pharmatrack.png"
    },
    {
      title: "SignSync",
      oneLiner: "Real-time sign language translation using computer vision",
      description: "An innovative tool that translates sign language into text/speech in real-time using computer vision and AI models.",
      techStack: ["React.js", "Python 3", "FastAPI", "MediaPipe", "Gemini API"],
      github: "https://github.com/JustineSalinas/SignSync",
      image: "/projects/signsync.png"
    },
    {
      title: "BinSense",
      oneLiner: "Smart waste bin monitoring with IoT integration",
      description: "An IoT-based waste management solution that monitors bin fill levels and optimizes collection routes.",
      techStack: ["Arduino UNO", "Python", "ESP8266", "Sensors"],
      github: "https://github.com/JustineSalinas/BinSense",
      images: ["/projects/binsense1.jpg", "/projects/binsense2.jpg"]
    }
  ],
  techStack: {
    "Frontend": ["HTML5", "CSS", "TypeScript", "React", "Next.js", "Tailwind CSS"],
    "Backend": ["Node.js", "Express", "Python", "Java", "PHP"],
    "Database": ["Supabase", "MySQL"],
    "Developer Tools": ["Git", "GitHub", "Figma"]
  }
};