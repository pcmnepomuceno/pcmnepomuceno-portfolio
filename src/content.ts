export type Profile = {
  name: string;
  displayName: string;
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

export const profile: Profile = {
  name: "Prince Czedrick Nepomuceno",
  displayName: "Czed Nepomuceno",
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
    alt: "Portrait of Czed Nepomuceno wearing his University of the Philippines graduation sash",
  },
};

// Add "Projects", "Skills", "Contact" when those sections exist (Milestones 4-5).
export const nav = ["Home", "Experience"];

const items: ExperienceItem[] = [
  {
    type: "org",
    title: "Vice President for External Affairs",
    organization: "UPLB Computer Science Society",
    start: "2023",
    end: "2024",
    bullets: [],
    tags: [],
  },
  {
    type: "work",
    title: "Software Developer Intern",
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
    bullets: [],
    tags: [],
  },
];

// Year of a date string; an end with no 4-digit year (e.g. "Present") is most recent.
const year = (date: string) => Number(/\d{4}/.exec(date)?.[0] ?? Infinity);

// Most recent first: end year, then start year. Array sort is stable, so ties keep source order.
export const experience: ExperienceItem[] = [...items].sort(
  (a, b) => year(b.end) - year(a.end) || year(b.start) - year(a.start),
);
