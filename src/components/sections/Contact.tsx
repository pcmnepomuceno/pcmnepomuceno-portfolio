import CopyEmail from "@/components/ui/CopyEmail";
import { textLink } from "@/components/ui/links";
import { contactHeading, contactIntro, cv, profile } from "@/content";

// Sits on the red band (see .contact-band in globals.css): every color token inside resolves to white.
export default function Contact() {
  const { links } = profile;

  return (
    <section id="contact" className="space-y-10 py-16 md:py-24">
      <h2 className="text-3xl">{contactHeading}</h2>
      <div className="space-y-6">
        <p className="max-w-prose">{contactIntro}</p>
        <CopyEmail />
        <ul role="list" className="flex flex-wrap gap-x-6 gap-y-1">
          <li>
            <a href={links.github} className={textLink}>
              GitHub
            </a>
          </li>
          <li>
            <a href={links.linkedin} className={textLink}>
              LinkedIn
            </a>
          </li>
          <li>
            <a href={cv.href} download className={textLink}>
              {cv.label}
              <span className="sr-only"> (PDF)</span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
