export type Project = {
   slug: string;
   title: string;
   category: string;
   year: string;
   role: string;
   description: string;
   technologies: string[];
   /** Image path (svg, png, jpg, avif...) or video path (mp4, webm, mov, m4v). */
   thumbnail: string;
   images: string[];
   challenge: string;
   solution: string;
   features: string[];
   liveUrl?: string;
   githubUrl?: string;
};

// Replace the sample content below with your own case studies.
export const projects: Project[] = [
   {
      slug: "saling-pandu",
      title: "Saling Pandu",
      category: "SaaS Platform",
      year: "2026",
      role: "Frontend development · SaaS development · UI engineering",
      description:
         "A SaaS-based internal ticketing platform designed to help organizations manage support requests, communication, and operational workflows in a centralized workspace.",
      technologies: [
         "Vue",
         "TypeScript",
         "Tailwind CSS",
         "Pinia",
         "Vue Router",
         "Axios",
         "Laravel",
         "MySQL",
      ],
      thumbnail: "/work/salingpandu/salingpandu-thumbnail.mp4",
      images: [
         "/work/salingpandu/salingpandu-preview-1.png",
         "/work/salingpandu/salingpandu-preview-2.png",
         "/work/salingpandu/salingpandu-preview-3.png",
         "/work/salingpandu/salingpandu-preview-4.png",
         "/work/salingpandu/salingpandu-preview-5.png",
      ],
      challenge:
         "The existing internal ticketing workflow needed to evolve into a more structured SaaS experience while keeping complex support operations clear and efficient for different types of users.",
      solution:
         "I worked on the frontend implementation of the SaaS platform, building reusable Vue components and responsive interfaces for ticket management, conversations, templates, references, escalations, and organization workflows while integrating them with the Laravel API.",
      features: [
         "SaaS ticket management",
         "Ticket conversation and reply system",
         "Public and internal replies",
         "Ticket escalation workflow",
         "Reusable response templates",
         "Organization-based access",
         "Reference and knowledge management",
         "File attachment support",
         "Responsive dashboard interface",
         "API-driven frontend architecture",
      ],
      githubUrl: "",
      liveUrl: "https://pandu.salingsae.id/",
   },
   {
      slug: "masmile",
      title: "MASMILE",
      category: "Computer Vision",
      year: "2026",
      role: "Frontend development · Computer vision · Motion design",
      description:
         "An interactive smile detection experience that turns real-time face tracking into a playful and visual computer vision experiment.",
      technologies: [
         "Next.js",
         "TypeScript",
         "GSAP",
         "Tailwind CSS",
         "MediaPipe",
         "Web Camera API",
      ],
      thumbnail: "/work/masmile/masmile-thumbnail.mp4",
      images: [
         "/work/masmile/masmile-preview-1.png",
         "/work/masmile/masmile-preview-2.png",
      ],
      challenge:
         "The goal was to make real-time computer vision feel approachable and engaging while keeping the experience responsive and visually focused.",
      solution:
         "I combined a large webcam canvas with real-time face detection, visual face bounding boxes, smile-state feedback, and carefully choreographed motion to turn the detection process into an interactive experience.",
      features: [
         "Real-time webcam detection",
         "Face bounding box tracking",
         "Smile detection feedback",
         "Large interactive camera canvas",
         "Responsive computer vision interface",
         "Motion-driven state transitions",
      ],
      githubUrl: "https://github.com/Moontaz/masmile",
      liveUrl: "https://masmile.vercel.app/",
   },

   {
      slug: "mavos",
      title: "MAVOS",
      category: "Voice interaction",
      year: "2026",
      role: "Frontend development · Voice interaction · Motion design",
      description:
         "A minimalist voice interaction experience exploring how natural speech can become a simple and expressive interface.",
      technologies: [
         "Next.js",
         "TypeScript",
         "GSAP",
         "Tailwind CSS",
         "Web Speech API",
         "Web Audio API",
      ],
      thumbnail: "/work/mavos/mavos-thumbnail.mp4",
      images: [
         "/work/mavos/mavos-preview-1.png",
         "/work/mavos/mavos-preview-2.png",
      ],
      challenge:
         "Voice interfaces can feel unfamiliar when users do not know what to say, what the system is listening for, or what happens after they speak.",
      solution:
         "I designed MAVOS around a minimal monochrome interface with a first-use guide, clear listening states, responsive voice feedback, and motion that communicates the system's current state without relying on unnecessary visual elements.",
      features: [
         "Voice interaction interface",
         "First-use onboarding guide",
         "Real-time listening states",
         "Speech feedback",
         "Audio-reactive visual states",
         "Minimal monochrome design",
      ],
      githubUrl: "https://github.com/Moontaz/mavos",
      liveUrl: "https://mavos-seven.vercel.app/",
   },

   {
      slug: "maarch",
      title: "MAARCH",
      category: "Software architecture",
      year: "2026",
      role: "Frontend development · Simulation engineering · Motion design",
      description:
         "An interactive software architecture simulator that makes complex distributed systems easier to understand through visual components, live simulation, and system behavior.",
      technologies: [
         "Next.js",
         "TypeScript",
         "GSAP",
         "Tailwind CSS",
         "React Flow",
      ],
      thumbnail: "/work/maarch.svg",
      images: ["/work/maarch.svg", "/work/maarch-detail.svg"],
      challenge:
         "Software architecture diagrams are often static and difficult to understand beyond the connections between components. I wanted to turn architecture into something users could interact with, simulate, and observe.",
      solution:
         "I built MAARCH around an interactive architecture canvas where each component represents a real system role. Requests can travel through connected components while the simulator models concurrency, routing, queues, capacity, failures, retries, scaling, and recovery.",
      features: [
         "Interactive architecture canvas",
         "Component-based system modeling",
         "Real-time request simulation",
         "Multiple concurrent requests",
         "Load balancing and routing",
         "Queue and worker simulation",
         "Failure and recovery scenarios",
         "Scaling and redundancy",
         "Live system metrics",
         "Architecture analysis",
      ],
      githubUrl: "https://github.com/Moontaz/MAARCH",
      liveUrl: "https://maarch.vercel.app/",
   },
];

export const featuredProjects = projects.slice(0, 3);
