import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { textLink } from "@/components/ui/links";
import { fashionTechCaseStudy as study, profile } from "@/content";

const title = `${study.title} case study | ${profile.name}`;
const path = "/projects/fashiontech";

export const metadata: Metadata = {
  title,
  description: study.description,
  alternates: { canonical: path },
  openGraph: { title, description: study.description, url: path, type: "article" },
  twitter: { card: "summary_large_image", title, description: study.description },
};

export default function FashionTechCaseStudy() {
  return (
    <main id="main" tabIndex={-1} className="mx-auto max-w-5xl px-4 py-10 md:py-16">
      <article className="space-y-10">
        <div className="max-w-prose space-y-6">
          <Link href="/#projects" className={`${textLink} font-mono text-sm`}>
            <span aria-hidden="true">←&nbsp;</span>
            {study.back}
          </Link>
          <div className="space-y-3">
            <h1 className="font-serif text-4xl">{study.title}</h1>
            <p className="text-lg">{study.subtitle}</p>
          </div>
          <div className="space-y-1 font-mono text-sm text-muted">
            {study.meta.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <p className="border-t border-border pt-4 text-sm text-muted">{study.note}</p>
        </div>

        {study.sections.map((section) => (
          <section key={section.heading} className="space-y-4">
            <div className="max-w-prose space-y-4">
              <h2 className="font-serif text-2xl">{section.heading}</h2>
              {section.body.map((block) =>
                typeof block === "string" ? (
                  <p key={block}>{block}</p>
                ) : (
                  <ul key={block[0]} role="list" className="list-disc space-y-1 pl-5">
                    {block.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ),
              )}
            </div>
            {section.screenshots && (
              // Focusable so the row can be scrolled with the arrow keys; below md it scrolls sideways.
              <ul
                role="list"
                aria-label={study.screenshotsLabel}
                tabIndex={0}
                className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:flex-wrap md:overflow-visible"
              >
                {study.screenshots.map((shot) => (
                  <li key={shot.src} className="w-56 shrink-0 snap-start md:w-[calc((100%-2rem)/3)]">
                    <figure className="space-y-2">
                      <Image
                        src={shot.src}
                        width={shot.width}
                        height={shot.height}
                        alt={shot.alt}
                        sizes="(min-width: 768px) 320px, 224px"
                        className="h-auto w-full rounded-md border border-border"
                      />
                      <figcaption className="text-sm text-muted">{shot.caption}</figcaption>
                    </figure>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}

        <p className="max-w-prose border-t border-border pt-4 text-sm text-muted">{study.credit}</p>
      </article>
    </main>
  );
}
