export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  role: string;
  description: string;
  technologies: string[];
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
    slug: 'northstar-editorial',
    title: 'Northstar Editorial',
    category: 'Digital editorial',
    year: '2024',
    role: 'Frontend development · Motion design',
    description: 'A calm, highly-readable publishing experience built around modular stories and deliberate motion.',
    technologies: ['Next.js', 'TypeScript', 'GSAP', 'Tailwind CSS'],
    thumbnail: '/work/northstar.svg',
    images: ['/work/northstar.svg', '/work/northstar-detail.svg'],
    challenge: 'The brief called for a premium editorial surface that could hold long-form stories without losing a sense of discovery.',
    solution: 'I paired a strong typographic grid with restrained scroll choreography, making the content feel tactile without competing with the writing.',
    features: ['Responsive editorial grid', 'Chapter progress navigation', 'Motion-safe image reveals', 'CMS-ready story modules'],
  },
  {
    slug: 'field-notes',
    title: 'Field Notes',
    category: 'Research platform',
    year: '2023',
    role: 'Product UI · Frontend development',
    description: 'A research library that turns dense qualitative work into a navigable, human-scale archive.',
    technologies: ['React', 'TypeScript', 'Node.js', 'REST API'],
    thumbnail: '/work/field-notes.svg',
    images: ['/work/field-notes.svg', '/work/field-notes-detail.svg'],
    challenge: 'Researchers needed an interface that made hundreds of fragments feel connected, while keeping filtering and reading frictionless.',
    solution: 'The interface uses a flexible index, persistent context, and progressive disclosure to surface relationships without overwhelming the reader.',
    features: ['Filterable archive', 'Keyboard-first navigation', 'Persistent reading context', 'Accessible data states'],
  },
  {
    slug: 'orbit-finance',
    title: 'Orbit Finance',
    category: 'Product experience',
    year: '2023',
    role: 'Interaction design · UI engineering',
    description: 'A focused financial dashboard that makes complex signals feel clear, useful, and easy to act on.',
    technologies: ['Next.js', 'React', 'Tailwind CSS', 'Data visualization'],
    thumbnail: '/work/orbit.svg',
    images: ['/work/orbit.svg', '/work/orbit-detail.svg'],
    challenge: 'The product had powerful data but the existing experience made important signals hard to spot and compare.',
    solution: 'I designed an information hierarchy around moments of decision, then used lightweight transitions to explain change instead of decorate it.',
    features: ['Responsive dashboard system', 'Live data states', 'Comparison views', 'Reduced-motion fallback'],
  },
  {
    slug: 'common-ground',
    title: 'Common Ground',
    category: 'Brand platform',
    year: '2022',
    role: 'Frontend development · Creative technology',
    description: 'A flexible identity system translated into a fast, expressive web experience for a cultural initiative.',
    technologies: ['Vue', 'JavaScript', 'GSAP', 'Web performance'],
    thumbnail: '/work/common-ground.svg',
    images: ['/work/common-ground.svg', '/work/common-ground-detail.svg'],
    challenge: 'The visual identity was expressive on paper, but needed a digital system that stayed coherent across many kinds of content.',
    solution: 'I built a small set of composable layouts and motion rules so the brand could flex while the underlying experience remained fast and accessible.',
    features: ['Composable page layouts', 'Art-directed media', 'Touch-aware interactions', 'Performance budget'],
  },
];

export const featuredProjects = projects.slice(0, 3);
