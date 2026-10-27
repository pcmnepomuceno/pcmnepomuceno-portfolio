import Image from "next/image";
import Seal from "@/components/ui/Seal";
import { outlineLink } from "@/components/ui/links";
import { cv, profile } from "@/content";

export default function Hero() {
  const { links, photo } = profile;

  return (
    <section
      id="intro"
      className="grid items-center gap-8 py-12 md:grid-cols-[1fr_18rem] md:gap-12 md:py-24"
    >
      <div className="min-w-0 space-y-6">
        <div className="space-y-4">
          <h1 className="text-4xl font-light text-balance md:text-6xl">{profile.name}</h1>
          <p className="text-lg md:text-xl">{profile.headline}</p>
        </div>
        <p className="max-w-prose">
          {profile.summary.map((part) =>
            typeof part === "string" ? (
              part
            ) : (
              <a
                key={part.href}
                href={part.href}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-accent underline-offset-4 hover:text-accent motion-safe:transition-colors"
              >
                {part.text}
                <span className="sr-only"> (opens in new tab)</span>
              </a>
            ),
          )}
        </p>
        <ul role="list" className="flex flex-wrap gap-3">
          <li>
            <a href={`mailto:${links.email}`} className={outlineLink}>
              Email
            </a>
          </li>
          <li>
            <a href={cv.href} download className={outlineLink}>
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
        </ul>
      </div>
      {/* The square file is zoomed inside a 4:5 frame to crop to head and upper chest; the file is untouched. */}
      <div className="relative order-first aspect-[4/5] w-48 border border-border md:order-none md:w-full">
        <div className="relative size-full overflow-hidden">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(min-width: 768px) 480px, 320px"
            preload
            className="origin-[50%_52%] scale-[1.33] object-cover object-center"
          />
        </div>
        <Seal className="absolute -bottom-3 -left-3 size-9 text-base" />
      </div>
    </section>
  );
}
