import Link from "next/link";
import { outlineLink, primaryLink, textLink } from "@/components/ui/links";
import ScreenshotLightbox from "@/components/ui/ScreenshotLightbox";
import { projects, type Project } from "@/content";

function ProjectItem({ project }: { project: Project }) {
  const meta = [project.org, project.role, project.period].filter(Boolean).join(" · ");

  return (
    <article
      className={`py-10 first:pt-0 last:pb-0${project.image ? " md:grid md:grid-cols-[minmax(0,1fr)_320px] md:gap-8 lg:grid-cols-[minmax(0,1fr)_400px]" : ""}`}
    >
      <div className="flex min-w-0 max-w-prose flex-col gap-4">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="text-2xl font-medium">{project.title}</h3>
          {meta && <p className="text-sm text-muted">{meta}</p>}
        </div>
        {project.result && <p className="text-sm">{project.result}</p>}
        <p>{project.summary}</p>
        {project.tags.length > 0 && (
          <ul role="list" aria-label="Technologies" className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li key={tag} className="rounded-md border border-border px-2 py-0.5 text-xs">
                {tag}
              </li>
            ))}
          </ul>
        )}
        {project.links.length > 0 && (
          <ul
            role="list"
            aria-label={`${project.title} links`}
            className="flex flex-wrap items-center gap-x-5 gap-y-1 pt-2"
          >
            {/* The first external link (the live demo) is the primary action, the rest are quiet. */}
            {project.links.map((link, i) => {
              // Paths starting with "/" are pages of this site: same tab, no arrow, always outline.
              const internal = link.href.startsWith("/");
              const className = internal ? outlineLink : i === 0 ? primaryLink : textLink;
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
        )}
        {project.status === "in-progress" && (
          <p className="pt-2 text-sm text-muted">Live demo in progress</p>
        )}
      </div>
      {project.image && (
        <div className="mt-6 min-w-0 md:mt-0">
          <ScreenshotLightbox title={project.title} image={project.image} />
        </div>
      )}
    </article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="space-y-10 border-t border-border py-16 md:py-24">
      <h2 className="text-3xl">Projects</h2>
      <div className="divide-y divide-border">
        {projects.map((project) => (
          <ProjectItem key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
