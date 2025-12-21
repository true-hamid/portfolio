import { yearsOfExperience } from "../utils/calculateExperience";

export const contentEN = {
  personal: {
    name: "Hamid Abdalrahman",
    title: "Mobile Lead Engineer",
    location: "Dubai, UAE",
    email: "hamidelmamouncom@gmail.com",
    linkedin: "https://linkedin.com/in/hamid-abdalrahman",
    github: "https://github.com/true-hamid",
  },
  contact: {
    heading: "Get In Touch",
    subheading:
      "Interested in working together? Let's connect and discuss your project",
    infoHeading: "Contact Information",
    followHeading: "Let's Connect",
    formHeading: "Send a Message",
    successMessage: "Message sent successfully. I'll get back to you soon.",
    errorMessage:
      "Failed to send message. Please try again or email me directly at hamidelmamouncom@gmail.com",
    placeholders: {
      name: "Your Name",
      email: "Your Email",
      message: "Your Message",
    },
    submitButton: "Send Message",
    sendingText: "Sending...",
    // Primary recipient used in the contact UI (kept separate from personal.email)
    emailPrimary: "hamidelmamouncom@gmail.com",
    socialLinks: [
      { label: "LinkedIn", href: "https://linkedin.com/in/hamid-abdalrahman" },
      { label: "GitHub", href: "https://github.com/true-hamid" },
    ],
  },

  hero: {
    badge: "Lead Mobile Engineer",
    heading: "Hamid Abdalrahman",
    subheading: "Building Enterprise Banking Solutions",
    description:
      `Lead Engineer with ${yearsOfExperience} years of experience designing and delivering enterprise-scale global digital banking solutions. Specialized in mobile engineering, secure digital channels, and multi-region product delivery.`,
    cta: {
      primary: "Who I Am",
      secondary: "Download CV",
    },
  },

  about: {
    title: "About Me",
    subtitle:
      `Lead Engineer with ${yearsOfExperience} years of experience designing and delivering enterprise-scale digital banking solutions across the UAE, Egypt, and Pakistan. Specialized in mobile engineering, secure digital channels, and multi-region product delivery. Trusted technical leader with a strong record of improving app performance, driving security maturity, and accelerating engineering productivity.`,
    highlights: [
      {
        title: `${yearsOfExperience} Years`,
        description: "Building & scaling engineering solutions",
      },
      {
        title: "Product Enabler",
        description: "Transforming ideas into shipped features",
      },
      {
        title: "Team Lead",
        description: "Empowering engineering teams to excel",
      },
      {
        title: "2M+ Users",
        description: "Using products I helped deliver",
      },
    ],
    journey: {
      title: "My Journey",
      paragraphs: [
        "After graduating with a B.S. in Computer Engineering in 2017, I started my career as a software developer at TPRA in Sudan, where I delivered solutions aligned with IT and regulatory requirements. I joined Mashreq Bank in Dubai in 2019, where I've progressed from Dev Engineer to Global Lead Engineer.",
        "I joined SemiCode as Head of Mobile Development, where I established and led the mobile engineering function in a fast-paced startup environment.",
        "Throughout my journey at Mashreq, I've led the development of digital banking solutions serving over 2M+ users, enhanced mobile security posture by reducing vulnerabilities by 90%, and achieved significant improvements in app performance including a 3× faster launch time. I developed the first React Native Windows application in the region and built native plugins integrating with UAE ICP systems, contributing to a 55% increase in new client onboarding.",
        "Currently pursuing my M.S. in Business Administration at AASTMT, Egypt, I continue to lead engineering efforts across multiple regions, provide technical leadership to distributed teams, and partner with product, security, and architecture teams to ensure governance, compliance, and technical excellence.",
      ],
    },
  },

  experience: {
    title: "Experience",
    subtitle:
      "My professional journey in mobile engineering and digital banking solutions",
    positions: [
      {
        title: "Global Lead Engineer",
        company: "Mashreq (Mobile Platform)",
        period: "Jul 2024 - Present",
        description: [
          "Lead engineering efforts for the Mashreq Mobile App across multiple regions (UAE, Egypt, Pakistan), supporting a user base exceeding 2M+",
          "Provide technical leadership, coaching, and mentorship to distributed engineering teams, resulting in 2× faster onboarding",
          "Architect scalable and secure mobile features aligned with compliance and business growth requirements",
          "Oversee end-to-end release management across Google Play, Apple App Store, and Huawei AppGallery",
          "Partner with product, security, and architecture teams to ensure governance, compliance, and technical excellence",
        ],
      },
      {
        title: "Senior Dev Engineer",
        company: "Mashreq (Mobile Platform)",
        period: "Jun 2022 - Aug 2024",
        description: [
          "Designed mobile banking features improving scalability and supporting a 5% increase in downloads and a 4.8 average store rating for Mashreq UAE retail app, and 4.3 for Mashreq Egypt retail app",
          "Enhanced mobile security posture through strong encryption, authentication layers, and proactive threat detection, reducing vulnerabilities by 90%",
          "Coordinated monthly releases across app stores, ensuring compliance with store policies and internal governance",
          "Collaborated with cybersecurity teams on audits and security hardening initiatives",
        ],
      },
      {
        title: "Dev Engineer",
        company: "Mashreq Bank (Assisted Channels)",
        period: "Nov 2019 - Jun 2022",
        description: [
          "Led a front-end squad delivering digital tools for client-facing staff, reducing manpower needs by 30%",
          "Developed the first React Native Windows application in the region",
          "Improved app performance by optimizing architecture and resolving bottlenecks, achieving a 3× faster launch time",
          "Created and maintained automated test suites with 80%+ coverage",
          "Built native plugins integrating with UAE ICP systems for Emirates ID and biometric readers, contributing to a 55% increase in new client onboarding",
        ],
      },
      {
        title: "Head of Mobile Development",
        company: "Semicode",
        period: "Aug 2018 - Aug 2019",
        description: [
          "Established and led the mobile engineering function in a startup environment",
          "Delivered three commercial mobile products, including an online school platform and two eCommerce apps",
          "Defined development standards and release processes for scalable delivery",
        ],
      },
      {
        title: "Software Developer",
        company: "TPRA - Sudan",
        period: "Aug 2017 - Dec 2018",
        description: [
          "Delivered software solutions aligned with IT and regulatory requirements",
          "Contributed to the development of the telecommunications authority's main website and mobile application",
        ],
      },
    ],
  },

  education: {
    title: "Education",
    degrees: [
      {
        degree: "M.S. in Business Administration",
        institution: "AASTMT, Egypt",
        period: "Sept 2024 - Present",
      },
      {
        degree: "B.S. in Computer Engineering",
        institution: "The Future University, Sudan",
        period: "Mar 2017",
      },
    ],
  },

  skills: {
    title: "Skills & Expertise",
    subtitle:
      `A comprehensive toolkit built over ${yearsOfExperience} years of hands-on experience in mobile engineering, web development, and enterprise-scale digital banking solutions`,
    categories: [
      {
        title: "Mobile Engineering",
        skills: [
          "React Native",
          "Android (Java/Kotlin)",
          "iOS",
          "Native SDK/Module Development",
          "NPM Package Development",
          "Mobile Architecture",
          "Performance Optimization",
          "Mobile Security Hardening",
          "Deep Linking",
          "OTA Updates",
          "Push Notifications",
          "Crashlytics/Sentry",
          "Mobile Analytics",
          "Device Integrations",
          "REST/GraphQL APIs",
          "Offline-first Development",
        ],
      },
      {
        title: "Web Development",
        skills: [
          "JavaScript (ES6+)",
          "TypeScript",
          "React",
          "Vite",
          "React Hooks",
          "Context API",
          "NX Monorepo",
          "Redux Toolkit",
          "Material UI",
          "Tailwind CSS",
          "Webpack",
          "Babel",
          "Responsive UI Design",
          "Component-driven Development",
        ],
      },
      {
        title: "Backend & DevOps",
        skills: [
          "Java (Spring Boot)",
          "Node.js (Express/Nest.js)",
          "Microservices",
          "REST API Design",
          "JWT/OAuth2",
          "MySQL",
          "MongoDB",
          "Azure DevOps Pipelines",
          "GitHub Actions",
          "CI/CD Automation",
          "Fastlane",
          "GitFlow",
          "Monitoring & Logging",
          "Release Governance",
        ],
      },
      {
        title: "Practices & Leadership",
        skills: [
          "Agile (Scrum/Kanban)",
          "Architecture Design",
          "Clean Architecture",
          "MVVM/MVI",
          "QA Automation (Unit/Integration/E2E)",
          "Code Quality Tools (ESLint/Prettier)",
          "Documentation",
          "Cross-functional Collaboration",
          "Mentorship & Leadership",
          "Performance Engineering",
        ],
      },
    ],
  },

  awards: {
    title: "Awards and Recognition",
    items: [
      {
        title: "Al Safwa – The Elite Club",
        organization: "Mashreq",
        year: "2022",
      },
      {
        title: "Certificate of Recognition of Outstanding Performance",
        organization: "Mashreq",
        year: "2020",
      },
      {
        title: "Featured Contribution – Microsoft Tech Community",
        organization: "Microsoft",
        link: "https://techcommunity.microsoft.com/",
      },
    ],
  },
};

export type ContentType = typeof contentEN;
