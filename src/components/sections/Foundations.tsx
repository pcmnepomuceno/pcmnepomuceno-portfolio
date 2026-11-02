import { foundations } from "@/content";

// Course projects as hairline rows on the Skills label column: no stamps, tags, links or buttons, so they don't read as Projects.
export default function Foundations() {
  return (
    <section id="foundations" data-nav-parent="skills" className="space-y-10 border-t border-border py-16 md:py-24">
      <h2 className="text-3xl">{foundations.heading}</h2>
      <div className="space-y-6">
        <ul role="list" className="divide-y divide-border border-y border-border">
          {foundations.items.map((item) => (
            <li key={item.title} className="grid gap-2 py-6 sm:grid-cols-[11rem_1fr] sm:gap-6">
              <p className="text-sm text-balance text-muted sm:pt-1">{item.meta}</p>
              <div className="max-w-prose space-y-2">
                <h3 className="text-lg font-medium">{item.title}</h3>
                <p>{item.what}</p>
                <p>
                  <span className="text-sm text-muted">{foundations.partLabel}:</span> {item.part}
                </p>
              </div>
            </li>
          ))}
        </ul>
        <div className="max-w-prose space-y-2">
          {foundations.notes.map((note) => (
            <p key={note} className="text-sm text-muted">
              {note}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
