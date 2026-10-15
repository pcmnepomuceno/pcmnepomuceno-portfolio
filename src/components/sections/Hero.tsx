import Image from "next/image";
import { profile } from "@/content";

const linkClass =
  "inline-flex min-h-11 items-center rounded-md border border-border px-4 font-medium hover:border-accent hover:text-accent motion-safe:transition-colors";

export default function Hero() {
  const { links, photo } = profile;

  return (
    <section
      id="home"
      className="grid items-center gap-8 py-16 sm:grid-cols-[1fr_17.5rem] sm:gap-12 sm:py-24"
    >
      <div className="min-w-0 space-y-6">
        <div className="space-y-3">
          <p className="font-mono text-sm text-muted">~/czed</p>
          <h1 className="font-serif text-4xl sm:text-5xl">{profile.displayName}</h1>
          <p className="text-lg sm:text-xl">{profile.role}</p>
        </div>
        <p className="max-w-prose">{profile.summary}</p>
        <p className="font-mono text-sm text-muted">
          {profile.education} · {profile.location}
        </p>
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
            <a href={`mailto:${links.email}`} className={linkClass}>
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
        sizes="(min-width: 640px) 280px, 128px"
        preload
        className="order-first aspect-square size-32 rounded-md border border-border object-cover object-top sm:order-none sm:size-70"
      />
    </section>
  );
}
