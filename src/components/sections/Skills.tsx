import { skills } from "@/content";

export default function Skills() {
  return (
    <section id="skills" className="space-y-10 border-t border-border py-16 sm:py-24">
      <div className="space-y-3">
        <p aria-hidden="true" className="font-mono text-sm text-muted">
          <span className="text-accent">~/</span>skills
        </p>
        <h2 className="font-serif text-3xl">Skills</h2>
      </div>
      <dl className="divide-y divide-border border-y border-border">
        {skills.map((group) => (
          <div key={group.label} className="grid gap-1 py-4 sm:grid-cols-[11rem_1fr] sm:gap-6">
            <dt className="font-mono text-sm text-muted sm:pt-0.5">{group.label}</dt>
            <dd>{group.items.join(", ")}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
