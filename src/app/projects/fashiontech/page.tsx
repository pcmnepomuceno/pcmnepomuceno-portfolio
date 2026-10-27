import type { Metadata } from "next";
import Link from "next/link";
import { textLink } from "@/components/ui/links";
import ScreenshotLightbox from "@/components/ui/ScreenshotLightbox";
import { fashionTechCaseStudy as study, profile } from "@/content";

const title = `${study.title} case study | ${profile.name}`;
const path = "/projects/fashiontech";

// A page that defines its own openGraph/twitter loses the root opengraph-image file's tags, so point at it here.
const image = { url: "/opengraph-image", width: 1200, height: 630, alt: `${profile.name}, ${profile.role}` };

export const metadata: Metadata = {
  title,
  description: study.description,
  alternates: { canonical: path },
  openGraph: { title, description: study.description, url: path, type: "article", images: [image] },
  twitter: { card: "summary_large_image", title, description: study.description, images: [image] },
};

export default function FashionTechCaseStudy() {
  return (
    <main id="main" tabIndex={-1} className="mx-auto max-w-5xl px-4 py-10 md:py-16">
      <article className="space-y-10">
        <div className="max-w-prose space-y-6">
          <Link href="/#projects" className={`${textLink} text-sm`}>
            <span aria-hidden="true">←&nbsp;</span>
            {study.back}
          </Link>
          <div className="space-y-3">
            <h1 className="text-4xl">{study.title}</h1>
            <p className="text-lg">{study.subtitle}</p>
          </div>
          <div className="space-y-1 text-sm text-muted">
            {study.meta.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <p className="border-t border-border pt-4 text-sm text-muted">{study.note}</p>
        </div>

        {study.sections.map((section) => (
          <section key={section.heading} className="space-y-4">
            <div className="max-w-prose space-y-4">
              <h2 className="text-2xl">{section.heading}</h2>
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
              // One sideways-scrolling row at every width; focusable so the arrow keys scroll it (Tab alone leaves a half-visible thumbnail where it is). The 4px of padding (cancelled by the negative margin) and scroll padding keep the thumbnails' focus rings from being clipped by the overflow.
              <ul
                role="list"
                aria-label={study.screenshotsLabel}
                tabIndex={0}
                className="-mx-1 -mt-1 flex scroll-px-1 snap-x snap-mandatory gap-4 overflow-x-auto px-1 pt-1 pb-2"
              >
                {study.screenshots.map((shot) => (
                  <li key={shot.src} className="w-56 shrink-0 snap-start md:w-52 lg:w-56">
                    <figure className="space-y-2">
                      <ScreenshotLightbox title={study.title} image={shot} />
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
