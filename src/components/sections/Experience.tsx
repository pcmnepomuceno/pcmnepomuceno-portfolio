import { experience } from "@/content";

export default function Experience() {
  return (
    <section id="experience" className="space-y-10 border-t border-border py-16 sm:py-24">
      <div className="space-y-3">
        <p className="font-mono text-sm text-muted">~/experience</p>
        <h2 className="font-serif text-3xl">Experience</h2>
      </div>
      <ol className="border-l border-border">
        {experience.map((item) => (
          <li
            key={`${item.organization}-${item.title}`}
            className="relative space-y-2 pb-10 pl-6 last:pb-0 sm:grid sm:grid-cols-[9rem_1fr] sm:gap-6 sm:space-y-0 sm:pl-8"
          >
            <span
              aria-hidden="true"
              className="absolute top-1.5 -left-1 size-2 rounded-full bg-accent"
            />
            <p className="font-mono text-sm text-muted sm:pt-0.5">
              {item.start} – {item.end}
            </p>
            <div className="min-w-0 space-y-2">
              <h3 className="font-medium">{item.title}</h3>
              <p className="text-muted">{item.organization}</p>
              <ul className="list-disc space-y-1 pl-5">
                {item.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              {item.tags.length > 0 && (
                <ul className="flex flex-wrap gap-2 pt-1">
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
