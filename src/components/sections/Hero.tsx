import Image from "next/image";
import { outlineLink, primaryLink } from "@/components/ui/links";
import { cv, profile } from "@/content";

export default function Hero() {
  const { links, photo } = profile;

  return (
    <section
      id="home"
      className="grid items-center gap-8 py-16 sm:grid-cols-[1fr_17.5rem] sm:gap-12 md:py-24"
    >
      <div className="min-w-0 space-y-6">
        <div className="space-y-3">
          <p aria-hidden="true" className="font-mono text-sm text-muted">
            <span className="text-accent">~/</span>czed
          </p>
          <h1 className="font-serif text-3xl text-balance sm:text-4xl md:text-5xl">
            {profile.name}
          </h1>
          <p className="text-lg sm:text-xl">{profile.role}</p>
        </div>
        <p className="max-w-prose">{profile.summary}</p>
        <p className="font-mono text-sm text-muted">
          {profile.education} · {profile.location}
        </p>
        <ul role="list" className="flex flex-wrap gap-3">
          <li>
            <a href={cv.href} download className={primaryLink}>
              {cv.label}
              <span className="sr-only"> (PDF)</span>
            </a>
          </li>
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
            <a href={`mailto:${links.email}`} className={outlineLink}>
              Email
            </a>
          </li>
        </ul>
      </div>
      <Image
        src={photo.src}
        alt={photo.alt}
        width={560}
        height={560}
        sizes="(min-width: 640px) 280px, 96px"
        preload
        className="order-first aspect-square size-24 rounded-md border border-border object-cover object-center sm:order-none sm:size-70"
      />
    </section>
  );
}
