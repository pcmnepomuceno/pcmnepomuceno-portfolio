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

export default function Experience() {
  return (
    <section id="experience" className="space-y-10 border-t border-border py-16 md:py-24">
      <div className="space-y-3">
        <p aria-hidden="true" className="font-mono text-sm text-muted">
          <span className="text-accent">~/</span>experience
        </p>
        <h2 className="font-serif text-3xl">Experience</h2>
      </div>
      <ol role="list" className="border-l border-border">
        {experience.map((item) => (
          <li
            key={`${item.organization}-${item.title}`}
            className="relative space-y-2 pb-10 pl-6 last:pb-0 sm:grid sm:grid-cols-[11rem_1fr] sm:gap-6 sm:space-y-0 sm:pl-8"
          >
            <span
              aria-hidden="true"
              className="absolute top-1.5 -left-1 size-2 rounded-full bg-accent sm:top-2.5"
            />
            <p className="font-mono text-sm whitespace-nowrap text-muted sm:pt-1">
              <DateText value={item.start} /> – <DateText value={item.end} />
            </p>
            <div className="min-w-0 space-y-2">
              <h3 className="font-serif text-lg font-semibold">{item.title}</h3>
              <p className="text-muted">{item.organization}</p>
              {item.bullets.length > 0 && (
                <ul role="list" className="list-disc space-y-1 pl-5">
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
              {item.tags.length > 0 && (
                <ul role="list" aria-label="Technologies" className="flex flex-wrap gap-2 pt-1">
                  {item.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-md border border-border px-2 py-0.5 font-mono text-xs"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
