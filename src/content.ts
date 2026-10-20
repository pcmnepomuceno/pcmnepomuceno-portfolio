export type Profile = {
  name: string;
  role: string;
  location: string;
  education: string;
  availability: string;
  summary: (string | { text: string; href: string })[];
  tldr: string[];
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
  // `context` completes the link's accessible name for screen readers, e.g. "Case study for FashionTech".
  link?: { label: string; href: string; context: string };
};

type ProjectImageFile = { src: string; width: number; height: number };

export type Project = {
  slug: string;
  title: string;
  summary: string;
  status: "live" | "in-progress" | null;
  featured: boolean;
  // Short context tag shown beside the title, e.g. "Thesis".
  badge?: string;
  // One headline number, restated from the summary; shown under the title.
  result?: string;
  // Organization the work was done for, shown first in the meta line, e.g. "Limitless Lab".
  org?: string;
  period?: string;
  role?: string;
  tags: string[];
  links: { label: string; href: string }[];
  // Theme pair: Projects shows the light file in light mode and the dark file in dark mode.
  image?: { light: ProjectImageFile; dark: ProjectImageFile; alt: string; caption: string };
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
  availability:
    "Open to Software Engineer, Backend, Full-Stack and AI Automation roles · Philippines (UTC+8) · remote or on-site",
  summary: [
    "I'm a Computer Science graduate from UP Los Baños (July 2026) who builds full-stack, from backend systems to AI-powered search. My thesis, ",
    { text: "CosRec", href: "https://cosrec.vercel.app" },
    ", is a live image-text search system.",
  ],
  tldr: [
    "CS graduate, UP Los Baños, July 2026",
    "Built CosRec, a live image-text search; the right item is in the top results 97.8% of the time",
    "Built Steam Review Analyzer, a live tool that reads game reviews for sentiment and topics",
    "Software Engineer intern at Limitless Lab (Flutter, Firebase)",
  ],
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

export const cv = { href: "/cv/Prince-Czedrick-Nepomuceno-CV.pdf", label: "Download CV", navLabel: "CV" };

// Each item links to the section whose id is the lowercase item.
export const nav = ["Home", "Projects", "Experience", "Skills", "Contact"];

// Hero summary / TL;DR switch.
export const summaryToggle = { label: "Hero summary view", summary: "Summary", tldr: "TL;DR" };

export const skipLink = "Skip to content";

export const backToTop = "Back to top";

// Screenshot lightbox: Projects (light/dark pair) and the case study gallery (single images).
export const lightbox = {
  heading: (title: string) => `${title} results`,
  open: (title: string) => `Enlarge screenshot: ${title} results`,
  close: "Close",
  scrollRegion: "Screenshot, scrollable",
  panHint: "Scroll sideways to see the full results.",
  // Single screenshots in the case study gallery; the caption names the screen.
  openShot: (caption: string) => `Enlarge screenshot: ${caption}`,
  headingShot: (title: string) => `${title} screenshot`,
  panHintShot: "Scroll to see the full screen.",
};

// Contact "Copy email" button and its result messages.
export const copyEmail = {
  button: "Copy email",
  copied: "Email copied",
  failed: "Couldn't copy automatically. The address is selected, so you can copy it yourself.",
};

// Accessible names of the mobile menu button (below sm).
export const menu = { open: "Open menu", close: "Close menu" };

// Command palette copy. Actions are built from nav and cv, so only fixed words live here.
export const palette = {
  trigger: "Open command palette",
  hint: "Ctrl K",
  dialog: "Command palette",
  input: "Search commands",
  placeholder: "Type a command",
  goTo: "Go to",
  toggleTheme: "Toggle theme",
  empty: "No matching commands",
  themeChanged: { dark: "Theme changed to dark", light: "Theme changed to light" },
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
      "Built FashionTech, an inventory and job-order mobile app for small fashion and tailoring businesses in Flutter and Firebase, including the data model, activity logging and the Transaction Dashboard.",
    ],
    tags: ["Flutter", "Firebase"],
    link: { label: "Case study", href: "/projects/fashiontech", context: "FashionTech" },
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
    slug: "cosrec",
    title: "CosRec",
    summary:
      "A hybrid image-text search system for matching cosplay items, built as my solo undergraduate thesis project (Special Problem). It pairs a pretrained Vision Transformer with TF-IDF retrieval and reached 97.8% Top-K accuracy on a 500-item dataset.",
    status: "live",
    featured: true,
    badge: "Thesis",
    result: "Right item in the top results 97.8% of the time (500-item test set)",
    period: "Apr 2026 – Oct 2026",
    tags: ["Python", "Vision Transformer", "TF-IDF"],
    links: [{ label: "Live demo", href: "https://cosrec.vercel.app" }],
  },
  {
    slug: "steam-review-analyzer",
    title: "Steam Review Analyzer",
    summary:
      "Analyzes Steam game reviews for sentiment and the aspects players talk about. Sentiment comes from a TF-IDF and logistic regression model trained on Steam's own thumbs-up and thumbs-down labels, which reached F1 0.780 on the minority class against a 0.000 baseline.",
    status: "live",
    featured: true,
    period: "Oct 2026",
    result: "Spots the rarer review class a naive baseline misses entirely (F1 0.780 vs 0.000)",
    tags: ["Python", "FastAPI", "PostgreSQL", "scikit-learn", "Next.js"],
    links: [
      { label: "Live demo", href: "https://steam-review-analyzer-wheat.vercel.app/" },
      { label: "Source code", href: "https://github.com/pcmnepomuceno/steam-review-analyzer" },
    ],
    image: {
      light: { src: "/images/projects/steam-review-analyzer-light.png", width: 1104, height: 851 },
      dark: { src: "/images/projects/steam-review-analyzer-dark.png", width: 1104, height: 851 },
      alt: "Steam Review Analyzer 'By topic' results for Cyberpunk 2077, showing the share of reviews that read as positive for each topic: Performance 63%, Price and value 74%, Bugs and stability 55%, Story and writing 81%, Gameplay 83%, each with example review quotes.",
      caption: "Cyberpunk 2077, the 1,000 most recent English reviews, Oct 5 to Oct 12, 2026.",
    },
  },
  {
    slug: "fashiontech",
    title: "FashionTech",
    summary:
      "A mobile app that puts inventory, job orders, and profit tracking for small tailoring and fashion businesses in one place. Built with a teammate during my internship at Limitless Lab.",
    status: null,
    featured: false,
    badge: "Internship",
    org: "Limitless Lab",
    period: "Jun 2025 – Jul 2025",
    tags: ["Flutter", "Firebase"],
    links: [{ label: "Case study", href: "/projects/fashiontech" }],
  },
  {
    slug: "picsel",
    title: "PICSEL",
    summary:
      "A team room-reservation web app built with the PERN stack. I built front-end pieces (account and booking modals, dashboard cards, nested routes) and wrote the documentation.",
    status: null,
    featured: false,
    role: "Team project",
    period: "Mar – May 2024",
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

export type CaseStudy = {
  title: string;
  subtitle: string;
  meta: string[];
  note: string;
  description: string;
  back: string;
  // A body block is a paragraph (string) or a bullet list (string[]).
  sections: { heading: string; body: (string | string[])[]; screenshots?: true }[];
  screenshots: { src: string; width: number; height: number; alt: string; caption: string }[];
  screenshotsLabel: string;
  credit: string;
};

// Case study at /projects/fashiontech. Written with permission from Limitless Lab (see docs/DECISIONS.md):
// no source code, repo, demo, deck, config or real-looking data.
export const fashionTechCaseStudy: CaseStudy = {
  title: "FashionTech",
  subtitle: "Inventory and job-order management for small tailoring and fashion businesses",
  meta: [
    "Internship project at Limitless Lab · Jun–Jul 2025 · Team of two",
    "My role: Software Engineer Intern",
    "Stack: Flutter (Dart), Firebase (Authentication, Firestore, Storage), Figma",
  ],
  note: "Built during an internship at Limitless Lab and shown with permission. The source code, live deployment and company materials are not public. All data in the screenshots is dummy data.",
  description:
    "Case study of FashionTech, a Flutter and Firebase mobile app for inventory, job orders and profit tracking, built during an internship at Limitless Lab.",
  back: "Back to Projects",
  sections: [
    {
      heading: "The problem",
      body: [
        "Many small fashion retailers in Taytay still run their business on notebooks and memory. They lose track of fabric and product stock, can't tell whether a product actually earns a profit once fabric and production costs are counted, and juggle job orders that involve several fabrics and suppliers.",
        "We framed it as three questions:",
        [
          "How might we simplify fabric and product inventory tracking to prevent oversupply and wastage?",
          "How might we help retailers monitor profitability in real time?",
          "How might we streamline job orders that involve multiple fabrics and suppliers?",
        ],
      ],
    },
    {
      heading: "Who it's for",
      body: [
        "We designed around two personas. Ate Lorna, 45, owns a small fashion stall, tracks inventory in notebooks, and mostly uses Messenger and calls. Her daughter Anna, 22, helps with inventory and sales and is comfortable with digital tools. That pairing pushed us toward a mobile-first app with simple layouts and minimal forms.",
      ],
    },
    {
      heading: "The solution",
      screenshots: true,
      body: [
        "FashionTech is a mobile app that puts the daily operations in one place:",
        [
          "Inventory: fabric and product stock with variants, low-stock indicators and an automatic activity log.",
          "Job orders: assign fabrics and yardage to each product order and follow it through a status workflow.",
          "Profit checker: profit per product, calculated from the sales log and unit costs.",
          "Transactions: record sales, income and expenses, and see total profit with a fabric-cost breakdown.",
          "Customers and suppliers: who bought what, when, and how much.",
          "Roles and per-user data: admin and user roles. Each record carries its creator's ID and pages query by it, so users see their own records, and admins can see everything.",
        ],
      ],
    },
    {
      heading: "How we split the work",
      body: [
        "We worked closely and both touched most of the app, with different focus areas.",
        "My focus:",
        [
          "Designed the Firestore data model and migrated it through several revisions (ERD v7 to v9), updating the collections, models and services each time.",
          "Built the fabric, product (variants, colors, sizes, multi-image upload), job order, customer, supplier and transaction modules.",
          "Built the Transaction Dashboard (income, expenses, total profit and a fabric-cost breakdown) and the sell modal.",
          "Implemented the activity-logging system across products, fabrics, job orders, transactions and suppliers.",
          "Added per-user data filtering through Firestore queries, plus admin role checks.",
          "Collaborated on the UI design in Figma and built responsive UI components.",
          "Wrote the project README and tests for category management and fabric logging.",
        ],
        "Justin Andrei Ibañez's focus:",
        [
          "The admin side.",
          "The profit calculation and the stock-deducting sale transaction, and the profit checker on the home dashboard.",
          "Notifications, profile and settings pages, and the recent-activity feed.",
          "Bug fixing across the app.",
        ],
      ],
    },
    {
      heading: "Challenges",
      body: [
        [
          "A dynamic app for traditional users: we kept layouts simple and forms short, and designed for phones first.",
          "An evolving data structure: jobs, products, fabrics and logs all relate to each other, so we kept an ERD and revised it as feedback came in.",
          "A short internship: we prioritized the core modules first (inventory, job orders and profit checker) and left the rest for later.",
          "Firestore has no joins, so related records are fetched and combined in the app, and per-user filtering is done with queries on a creator ID field.",
        ],
      ],
    },
    {
      heading: "What I'd do next",
      body: [
        "Per-user data is filtered in the Firestore queries, since each record carries its creator's ID. I'd enforce this with Firestore security rules, so it holds on the server side too.",
      ],
    },
    {
      heading: "What I learned",
      body: [
        [
          "Building and shipping a working Flutter and Firebase MVP end to end in a short timeframe.",
          "Structuring Firestore data and queries so they stay maintainable as requirements change.",
          "Resolving bugs quickly in a fast-paced team environment.",
          "Good design starts with the real user's problem, not only the interface.",
        ],
      ],
    },
  ],
  screenshotsLabel: "FashionTech screenshots, scrollable",
  // Order: home, products, job orders, profit, customers. One entry per image; the page renders them all.
  screenshots: [
    {
      src: "/images/projects/fashiontech/fashiontech-05-home.png",
      width: 1240,
      height: 1750,
      alt: "FashionTech home screen showing fabric and product totals and a recent-activity feed.",
      caption: "Home",
    },
    {
      src: "/images/projects/fashiontech/fashiontech-01-products.png",
      width: 1236,
      height: 1740,
      alt: "FashionTech Inventory screen listing a product with its price, stock level, low-stock tag and variants.",
      caption: "Inventory: products",
    },
    {
      src: "/images/projects/fashiontech/fashiontech-02-job-orders.png",
      width: 1242,
      height: 1746,
      alt: "FashionTech Job Orders screen with status counts for open, in progress, completed and overdue orders, and a job order card.",
      caption: "Job orders",
    },
    {
      src: "/images/projects/fashiontech/fashiontech-03-profit.png",
      width: 1238,
      height: 1746,
      alt: "FashionTech Transaction Dashboard showing total profit of 835 pesos, income of 1,160 pesos and expenses of 325 pesos.",
      caption: "Transaction Dashboard",
    },
    {
      src: "/images/projects/fashiontech/fashiontech-04-customers.png",
      width: 1242,
      height: 1746,
      alt: "FashionTech Customers screen with customer statistics and a customer card with notes.",
      caption: "Customers",
    },
  ],
  credit: "Built at Limitless Lab with Justin Andrei Ibañez.",
};
