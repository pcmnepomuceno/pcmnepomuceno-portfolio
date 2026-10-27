import Link from "next/link";
import { outlineLink, primaryLink, textLink } from "@/components/ui/links";
import ScreenshotLightbox from "@/components/ui/ScreenshotLightbox";
import { projects, type Project } from "@/content";

// Featured: the first external link (the live demo) is the primary action. Rows: every link is quiet text.
function ProjectLinks({ project, featured }: { project: Project; featured?: boolean }) {
  if (project.links.length === 0) return null;
  return (
    <ul
      role="list"
      aria-label={`${project.title} links`}
      className="flex flex-wrap items-center gap-x-5 gap-y-1"
    >
      {project.links.map((link, i) => {
        // Paths starting with "/" are pages of this site: same tab, no arrow.
        const internal = link.href.startsWith("/");
        const className = !featured ? textLink : internal ? outlineLink : i === 0 ? primaryLink : textLink;
        return (
          <li key={link.href}>
            {internal ? (
              <Link href={link.href} className={className}>
                {link.label}
                <span className="sr-only"> for {project.title}</span>
              </Link>
            ) : (
              <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
                {link.label}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="ml-1 size-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 17 17 7M8 7h9v9" />
                </svg>
                <span className="sr-only"> for {project.title} (opens in new tab)</span>
              </a>
            )}
          </li>
        );
      })}
    </ul>
  );
}

function Featured({ project }: { project: Project }) {
  return (
    <article className="max-w-prose space-y-5">
      <div className="space-y-2">
        <p className="text-sm text-muted">{[project.type, project.period].filter(Boolean).join(" · ")}</p>
        <h3 className="text-4xl font-light md:text-5xl">{project.title}</h3>
      </div>
      <p className="text-lg">{project.summary}</p>
      {project.result && <p>{project.result}</p>}
      {project.stack && <p className="text-muted">{project.stack}</p>}
      <div className="pt-2">
        <ProjectLinks project={project} featured />
      </div>
    </article>
  );
}

// Number | title, meta and type label | thumbnail (md and up). A row without an image uses the thumbnail column for text.
function Row({ project, index }: { project: Project; index: number }) {
  const meta = [project.org, project.period].filter(Boolean).join(" · ");

  return (
    <li className="grid grid-cols-[2rem_minmax(0,1fr)] gap-x-4 gap-y-3 py-8 md:grid-cols-[3rem_minmax(0,1fr)_15rem] md:gap-x-8">
      <span aria-hidden="true" className="row-span-2 pt-1 text-sm text-muted tabular-nums">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 md:col-span-2">
        <div>
          <h3 className="text-xl font-medium">{project.title}</h3>
          {meta && <p className="text-sm text-muted">{meta}</p>}
        </div>
        {/* Its own line on phones, so every row reads the same; right-aligned from sm. */}
        <p className="w-full text-sm text-muted sm:w-auto">{project.type}</p>
      </div>
      <div className={`max-w-prose space-y-3${project.image ? "" : " md:col-span-2"}`}>
        <p>{project.summary}</p>
        <ProjectLinks project={project} />
      </div>
      {project.image && (
        <div className="col-start-2 min-w-0 max-w-sm md:col-start-3 md:row-start-2 md:max-w-none">
          <ScreenshotLightbox title={project.title} image={project.image} />
        </div>
      )}
    </li>
  );
}

export default function Projects() {
  const featured = projects.find((project) => project.featured);
  const rows = projects.filter((project) => !project.featured);

  return (
    <section id="projects" className="space-y-12 py-16 md:py-24">
      <h2 className="text-3xl">Projects</h2>
      {featured && <Featured project={featured} />}
      <ol role="list" className="divide-y divide-border border-y border-border">
        {rows.map((project, i) => (
          <Row key={project.slug} project={project} index={i} />
        ))}
      </ol>
    </section>
  );
}
