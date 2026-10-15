import { contactIntro, cv, profile } from "@/content";

// Same outline style as Hero and Projects; shared module deferred to the Milestone 7 polish pass.
const linkClass =
  "inline-flex min-h-11 items-center rounded-md border border-muted px-4 font-medium hover:border-accent hover:text-accent motion-safe:transition-colors";

export default function Contact() {
  const { links } = profile;

  return (
    <section id="contact" className="space-y-10 border-t border-border py-16 sm:py-24">
      <div className="space-y-3">
        <p aria-hidden="true" className="font-mono text-sm text-muted">
          <span className="text-accent">~/</span>contact
        </p>
        <h2 className="font-serif text-3xl">Contact</h2>
      </div>
      <div className="space-y-6">
        <p className="max-w-prose">{contactIntro}</p>
        <a
          href={`mailto:${links.email}`}
          className="inline-flex min-h-11 items-center text-lg underline underline-offset-4 [overflow-wrap:anywhere] hover:text-accent motion-safe:transition-colors sm:text-xl"
        >
          {links.email}
        </a>
        <ul className="flex flex-wrap gap-3">
          <li>
            <a href={links.github} className={linkClass}>
              GitHub
            </a>
          </li>
          <li>
            <a href={links.linkedin} className={linkClass}>
              LinkedIn
            </a>
          </li>
          <li>
            <a href={cv.href} download className={linkClass}>
              {cv.label}
              <span className="sr-only"> (PDF)</span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
