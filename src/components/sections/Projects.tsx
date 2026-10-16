import { outlineLink } from "@/components/ui/links";
import Stamp from "@/components/ui/Stamp";
import { projects, type Project } from "@/content";

function ProjectItem({ project }: { project: Project }) {
  const meta = [project.role, project.period].filter(Boolean).join(" · ");

  return (
    <article
      className={`flex min-w-0 flex-col gap-4 rounded-md border border-border ${project.featured ? "p-6" : "max-w-2xl p-4"}`}
    >
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3
          className={`font-serif font-semibold ${project.featured ? "text-xl" : "text-lg"}`}
        >
          {project.title}
        </h3>
        {project.featured && project.status && <Stamp status={project.status} />}
        {meta && <p className="font-mono text-sm text-muted">{meta}</p>}
      </div>
      <p className="max-w-prose">{project.summary}</p>
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
          className="mt-auto flex flex-wrap gap-3 pt-2"
        >
          {project.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={outlineLink}
              >
                {link.label}
                <span className="sr-only"> for {project.title} (opens in new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      )}
      {project.status === "in-progress" && (
        <p className="mt-auto pt-2 font-mono text-sm text-muted">Live demo in progress</p>
      )}
    </article>
  );
}

export default function Projects() {
  const featured = projects.filter((project) => project.featured);
  const others = projects.filter((project) => !project.featured);

  return (
    <section id="projects" className="space-y-10 border-t border-border py-16 md:py-24">
      <div className="space-y-3">
        <p aria-hidden="true" className="font-mono text-sm text-muted">
          <span className="text-accent">~/</span>projects
        </p>
        <h2 className="font-serif text-3xl">Projects</h2>
      </div>
      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          {featured.map((project) => (
            <ProjectItem key={project.slug} project={project} />
          ))}
        </div>
        {others.map((project) => (
          <ProjectItem key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
