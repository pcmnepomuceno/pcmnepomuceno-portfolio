import { outlineLink } from "@/components/ui/links";
import { contactIntro, cv, profile } from "@/content";

export default function Contact() {
  const { links } = profile;

  return (
    <section id="contact" className="space-y-10 border-t border-border py-16 md:py-24">
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
        <ul role="list" className="flex flex-wrap gap-3">
          <li>
            <a href={links.github} className={outlineLink}>
              GitHub
            </a>
          </li>
          <li>
            <a href={links.linkedin} className={outlineLink}>
              LinkedIn
            </a>
          </li>
          <li>
            <a href={cv.href} download className={outlineLink}>
              {cv.label}
              <span className="sr-only"> (PDF)</span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
