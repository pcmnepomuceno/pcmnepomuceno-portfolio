import Link from "next/link";
import { textLink } from "@/components/ui/links";
import { experience } from "@/content";

const MONTHS = "JanFebMarAprMayJunJulAugSepOctNovDec";

// "Jun 2025" -> "2025-06", "2023" -> "2023"; anything else (e.g. "Present") renders as plain text.
function DateText({ value }: { value: string }) {
  const [month, year] = value.includes(" ") ? value.split(" ") : [undefined, value];
  if (!/^\d{4}$/.test(year)) return value;
  const index = month ? MONTHS.indexOf(month) / 3 : -1;
  const dateTime = month && index >= 0 ? `${year}-${String(index + 1).padStart(2, "0")}` : year;
  return <time dateTime={dateTime}>{value}</time>;
}

// Club and organization roles are one short line each, so they get a tighter row than work: the organization sits beside the title from sm up and under it below.
export default function Experience() {
  return (
    <section id="experience" className="space-y-10 border-t border-border py-16 md:py-24">
      <div className="space-y-3">
        <p aria-hidden="true" className="text-sm text-muted">
          <span className="text-accent">~/</span>experience
        </p>
        <h2 className="text-3xl">Experience</h2>
      </div>
      <ol role="list" className="border-l border-border">
        {experience.map((item) => {
          const compact = item.type === "org";
          return (
            <li
              key={`${item.organization}-${item.title}`}
              className={`relative space-y-2 pl-6 last:pb-0 sm:grid sm:grid-cols-[11rem_1fr] sm:gap-6 sm:space-y-0 sm:pl-8 ${compact ? "pb-6" : "pb-10"}`}
            >
              <span
                aria-hidden="true"
                className="absolute top-1.5 -left-1 size-2 rounded-full bg-accent sm:top-2.5"
              />
              <p className="text-sm whitespace-nowrap text-muted sm:pt-1">
                <DateText value={item.start} /> – <DateText value={item.end} />
              </p>
              <div className={`min-w-0 ${compact ? "space-y-1" : "space-y-2"}`}>
                {compact ? (
                  <>
                    <h3 className="text-lg font-medium">
                      {item.title}
                      <span
                        aria-hidden="true"
                        className="hidden font-sans text-sm font-normal text-muted sm:inline"
                      >
                        {" · "}
                      </span>
                      <span className="sr-only">, </span>
                      <span className="block font-sans text-sm font-normal text-muted sm:inline">
                        {item.organization}
                      </span>
                    </h3>
                    {item.bullets.map((bullet) => (
                      <p key={bullet} className="text-sm text-muted">
                        {bullet}
                      </p>
                    ))}
                  </>
                ) : (
                  <>
                    <h3 className="text-lg font-medium">{item.title}</h3>
                    <p className="text-muted">{item.organization}</p>
                  </>
                )}
                {!compact && item.bullets.length > 0 && (
                  <ul role="list" className="list-disc space-y-1 pl-5">
                    {item.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                )}
                {item.link && (
                  <p>
                    <Link href={item.link.href} className={textLink}>
                      {item.link.label}
                      <span className="sr-only"> for {item.link.context}</span>
                    </Link>
                  </p>
                )}
                {item.tags.length > 0 && (
                  <ul role="list" aria-label="Technologies" className="flex flex-wrap gap-2 pt-1">
                    {item.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-md border border-border px-2 py-0.5 text-xs"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
