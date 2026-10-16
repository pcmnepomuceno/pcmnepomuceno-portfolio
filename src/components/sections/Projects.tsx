import { primaryLink, textLink } from "@/components/ui/links";
import ScreenshotLightbox from "@/components/ui/ScreenshotLightbox";
import Stamp from "@/components/ui/Stamp";
import { projects, type Project } from "@/content";

function ProjectItem({ project }: { project: Project }) {
  const meta = [project.role, project.period].filter(Boolean).join(" · ");

  return (
    <article
      className={`py-10 first:pt-0 last:pb-0${project.image ? " md:grid md:grid-cols-[minmax(0,1fr)_320px] md:gap-8" : ""}`}
    >
      <div className="flex min-w-0 max-w-prose flex-col gap-4">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3
            className={`font-serif font-semibold ${project.featured ? "text-xl" : "text-lg"}`}
          >
            {project.title}
          </h3>
          {project.featured && project.status && <Stamp status={project.status} />}
          {meta && <p className="font-mono text-sm text-muted">{meta}</p>}
        </div>
        {project.result && <p className="font-mono text-sm">{project.result}</p>}
        <p>{project.summary}</p>
        {project.tags.length > 0 && (
          <ul role="list" aria-label="Technologies" className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li key={tag} className="rounded-md border border-border px-2 py-0.5 font-mono text-xs">
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
            {/* The first link in the data (the live demo) is the primary action, the rest are quiet. */}
            {project.links.map((link, i) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={i === 0 ? primaryLink : textLink}
                >
                  {link.label}
                  <span className="sr-only"> for {project.title} (opens in new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        )}
        {project.status === "in-progress" && (
          <p className="pt-2 font-mono text-sm text-muted">Live demo in progress</p>
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
      <div className="space-y-3">
        <p aria-hidden="true" className="font-mono text-sm text-muted">
          <span className="text-accent">~/</span>projects
        </p>
        <h2 className="font-serif text-3xl">Projects</h2>
      </div>
      <div className="divide-y divide-border">
        {projects.map((project) => (
          <ProjectItem key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
