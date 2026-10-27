import { foundations } from "@/content";

// Course projects as hairline cards: no stamps, tags, links or buttons, so they don't read as Projects.
export default function Foundations() {
  return (
    <section id="foundations" data-nav-parent="skills" className="space-y-10 border-t border-border py-16 md:py-24">
      <div className="space-y-3">
        <p aria-hidden="true" className="text-sm text-muted">
          <span className="text-accent">~/</span>foundations
        </p>
        <h2 className="text-3xl">{foundations.heading}</h2>
      </div>
      <div className="space-y-6">
        <ul role="list" className="grid gap-4 lg:grid-cols-3">
          {foundations.items.map((item) => (
            <li key={item.title} className="space-y-2 rounded-md border border-border p-5">
              <h3 className="text-lg font-medium">{item.title}</h3>
              <p className="text-sm text-balance text-muted">{item.meta}</p>
              <p>{item.what}</p>
              <p>
                <span className="text-sm text-muted">{foundations.partLabel}:</span> {item.part}
              </p>
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
