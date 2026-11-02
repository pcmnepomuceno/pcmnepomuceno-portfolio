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

// Sits on the band (see .band in globals.css): entries are separated by space only, no hairlines.
export default function Experience() {
  return (
    <section id="experience" className="space-y-10 py-16 md:py-24">
      <h2 className="text-3xl">Experience</h2>
      <ol role="list" className="space-y-10">
        {experience.map((item) => (
          <li
            key={`${item.organization}-${item.title}`}
            className="grid gap-2 sm:grid-cols-[11rem_1fr] sm:gap-6"
          >
            <p className="text-sm whitespace-nowrap text-muted sm:pt-1">
              <DateText value={item.start} /> – <DateText value={item.end} />
            </p>
            <div className="min-w-0 max-w-prose space-y-1">
              <h3 className="text-lg font-medium">{item.title}</h3>
              <p className="text-muted">{item.organization}</p>
              {item.bullets.map((bullet) => (
                <p key={bullet} className="pt-1">
                  {bullet}
                </p>
              ))}
              {item.link && (
                <p>
                  <Link href={item.link.href} className={textLink}>
                    {item.link.label}
                    <span className="sr-only"> for {item.link.context}</span>
                  </Link>
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
