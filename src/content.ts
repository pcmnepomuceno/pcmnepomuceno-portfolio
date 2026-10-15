export type Profile = {
  name: string;
  role: string;
  location: string;
  education: string;
  summary: string;
  links: { email: string; github: string; linkedin: string };
  photo: { src: string; alt: string };
};

export type ExperienceItem = {
  type: "work" | "org";
  title: string;
  organization: string;
  start: string;
  end: string;
  bullets: string[];
  tags: string[];
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  status: "live" | "in-progress" | null;
  featured: boolean;
  period?: string;
  role?: string;
  tags: string[];
  links: { label: string; href: string }[];
};

export type SkillGroup = {
  label: string;
  items: string[];
};

export const profile: Profile = {
  name: "Prince Czedrick Nepomuceno",
  role: "Full-stack developer",
  location: "Philippines",
  education: "BS Computer Science, UPLB (2026)",
  summary:
    "I'm a Computer Science graduate from UP Los Baños (July 2026) who builds full-stack, from backend systems to AI-powered search. I built CosRec, a hybrid search system that pairs a pretrained Vision Transformer with TF-IDF retrieval and reached 97.8% Top-K accuracy on a 500-item dataset. I'm looking for Software Engineer, Backend, Full-Stack, or AI Automation roles where I can keep building and learning.",
  links: {
    email: "pcmnepomuceno@gmail.com",
    github: "https://github.com/pcmnepomuceno",
    linkedin: "https://www.linkedin.com/in/pcmnepomuceno/",
  },
  photo: {
    src: "/images/portrait.jpg",
    alt: "Portrait of Prince Czedrick Nepomuceno wearing his University of the Philippines graduation sash",
  },
};

export const siteUrl = "https://pcmnepomuceno.vercel.app";

export const siteDescription =
  "Prince Czedrick Nepomuceno is a full-stack developer and UP Los Baños Computer Science graduate. Projects include a Steam review analyzer and CosRec, a hybrid image-text search system.";

export const contactIntro =
  "I'm looking for Software Engineer, Backend, Full-Stack, or AI Automation roles. Email is the best way to reach me.";

export const cv = { href: "/cv/Prince-Czedrick-Nepomuceno-CV.pdf", label: "Download CV" };

// Each item links to the section whose id is the lowercase item.
export const nav = ["Home", "Experience", "Projects", "Skills", "Contact"];

// Command palette copy. Actions are built from nav and cv, so only fixed words live here.
export const palette = {
  trigger: "Open command palette",
  hint: "Ctrl K",
  dialog: "Command palette",
  input: "Search commands",
  goTo: "Go to",
  toggleTheme: "Toggle theme",
  empty: "No matching commands",
};

const items: ExperienceItem[] = [
  {
    type: "org",
    title: "Vice President for External Affairs",
    organization: "UPLB Computer Science Society",
    start: "2023",
    end: "2024",
    bullets: ["Handled external partnerships and email correspondence for the society."],
    tags: [],
  },
  {
    type: "work",
    title: "Software Engineer Intern",
    organization: "Limitless Lab",
    start: "Jun 2025",
    end: "Jul 2025",
    bullets: [
      "Built a logging system and an automated financial dashboard for a business management platform used by real fashion and tailoring businesses.",
    ],
    tags: ["Flutter", "Firebase"],
  },
  {
    type: "org",
    title: "Secretary and Secretariat Committee Lead",
    organization: "UP Soma Soshiki (UPLB Japanese pop culture organization)",
    start: "2024",
    end: "2025",
    bullets: ["Handled email correspondence and wrote the minutes of meetings."],
    tags: [],
  },
];

// Year of a date string; an end with no 4-digit year (e.g. "Present") is most recent.
const year = (date: string) => Number(/\d{4}/.exec(date)?.[0] ?? Infinity);

// Most recent first: end year, then start year. Array sort is stable, so ties keep source order.
export const experience: ExperienceItem[] = [...items].sort(
  (a, b) => year(b.end) - year(a.end) || year(b.start) - year(a.start),
);

// Stamp text for each project status; null shows no stamp.
export const statusLabels: Record<NonNullable<Project["status"]>, string> = {
  live: "LIVE",
  "in-progress": "IN PROGRESS",
};

// Display order is source order (not sorted).
export const projects: Project[] = [
  {
    slug: "steam-review-analyzer",
    title: "Steam Review Analyzer",
    summary:
      "Analyzes Steam game reviews for sentiment and the aspects players talk about. Sentiment comes from a TF-IDF and logistic regression model trained on Steam's own thumbs-up and thumbs-down labels, which reached F1 0.780 on the minority class against a 0.000 baseline.",
    status: "live",
    featured: true,
    tags: ["Python", "FastAPI", "PostgreSQL", "scikit-learn", "Next.js"],
    links: [
      { label: "Live demo", href: "https://steam-review-analyzer-wheat.vercel.app/" },
      { label: "Source code", href: "https://github.com/pcmnepomuceno/steam-review-analyzer" },
    ],
  },
  {
    slug: "cosrec",
    title: "CosRec",
    summary:
      "A hybrid image-text search system for matching cosplay items, built as my solo undergraduate thesis project (Special Problem). It pairs a pretrained Vision Transformer with TF-IDF retrieval and reached 97.8% Top-K accuracy on a 500-item dataset.",
    status: "in-progress",
    featured: true,
    tags: ["Python", "Vision Transformer", "TF-IDF"],
    links: [],
  },
  {
    slug: "picsel",
    title: "PICSEL",
    summary:
      "A team room-reservation web app built with the PERN stack. I built front-end pieces (account and booking modals, dashboard cards, nested routes) and wrote the documentation.",
    status: null,
    featured: false,
    role: "Team project",
    period: "Mar - May 2024",
    tags: ["React", "Bootstrap"],
    links: [],
  },
];

export const skills: SkillGroup[] = [
  { label: "Languages", items: ["Python", "JavaScript", "Java", "Dart"] },
  { label: "Backend", items: ["FastAPI", "Node.js", "Express.js"] },
  { label: "Frontend", items: ["React", "Next.js"] },
  { label: "Mobile", items: ["Flutter"] },
  { label: "Data and ML", items: ["PostgreSQL", "MongoDB", "Firebase", "scikit-learn"] },
  { label: "Tools", items: ["Git", "Docker"] },
];
