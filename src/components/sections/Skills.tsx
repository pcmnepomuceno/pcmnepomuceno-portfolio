import { textLink } from "@/components/ui/links";
import { skills, skillsExposure, skillsFoundationsLink } from "@/content";

export default function Skills() {
  return (
    <section id="skills" className="space-y-10 border-t border-border py-16 md:py-24">
      <div className="space-y-3">
        <p aria-hidden="true" className="font-mono text-sm text-muted">
          <span className="text-accent">~/</span>skills
        </p>
        <h2 className="font-serif text-3xl">Skills</h2>
      </div>
      <div className="space-y-4">
        <dl className="divide-y divide-border border-y border-border">
          {skills.map((group) => (
            <div key={group.label} className="grid gap-1 py-4 sm:grid-cols-[11rem_1fr] sm:gap-6">
              <dt className="font-mono text-sm text-muted sm:pt-0.5">{group.label}</dt>
              <dd>{group.items.join(", ")}</dd>
            </div>
          ))}
        </dl>
        <p className="max-w-prose text-sm text-muted">{skillsExposure}</p>
        {/* Foundations has no top-nav item (the header stays at five), so Skills links to it. */}
        <p>
          <a href="#foundations" className={textLink}>
            {skillsFoundationsLink}
          </a>
        </p>
      </div>
    </section>
  );
}
