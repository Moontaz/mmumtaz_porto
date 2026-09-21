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

   // existing projects...
   {
      slug: "northstar-editorial",
      title: "Northstar Editorial",
      category: "Computer Vision",
      year: "2026",
      role: "Full-stack development · Motion design",
      description:
         "A calm, highly-readable publishing experience built around modular stories and deliberate motion.",
      technologies: [
         "Next.js",
         "TypeScript",
         "GSAP",
         "Tailwind CSS",
         "MediaPipe",
         "Web Camera API",
      ],
      thumbnail: "/work/northstar.svg",
      images: ["/work/northstar.svg", "/work/northstar-detail.svg"],
      challenge:
         "The brief called for a premium editorial surface that could hold long-form stories without losing a sense of discovery.",
      solution:
         "I paired a strong typographic grid with restrained scroll choreography, making the content feel tactile without competing with the writing.",
      features: [
         "Responsive editorial grid",
         "Chapter progress navigation",
         "Motion-safe image reveals",
         "CMS-ready story modules",
      ],
   },

   {
      slug: "field-notes",
      title: "Field Notes",
      category: "Research platform",
      year: "2023",
      role: "Product UI · Frontend development",
      description:
         "A research library that turns dense qualitative work into a navigable, human-scale archive.",
      technologies: ["React", "TypeScript", "Node.js", "REST API"],
      thumbnail: "/work/field-notes.svg",
      images: ["/work/field-notes.svg", "/work/field-notes-detail.svg"],
      challenge:
         "Researchers needed an interface that made hundreds of fragments feel connected, while keeping filtering and reading frictionless.",
      solution:
         "The interface uses a flexible index, persistent context, and progressive disclosure to surface relationships without overwhelming the reader.",
      features: [
         "Filterable archive",
         "Keyboard-first navigation",
         "Persistent reading context",
         "Accessible data states",
      ],
   },
];

export const featuredProjects = projects.slice(0, 3);
