export default function Home() {
  return (
    <main id="home" className="mx-auto max-w-5xl px-4 py-16">
      {/* TEMP design specimen: remove in Milestone 3 */}
      <section className="space-y-4">
        <p className="font-mono text-sm uppercase tracking-widest text-accent">
          Design specimen
        </p>
        <h1 className="font-serif text-4xl">Prince Czedrick Nepomuceno</h1>
        <p className="max-w-prose">
          Body text in Inter. The quick brown fox jumps over the lazy dog.
        </p>
        <p className="max-w-prose text-muted">
          Muted text sample for secondary information such as dates and captions.
        </p>
        <div className="flex flex-wrap items-center gap-6">
          <button
            type="button"
            className="rounded-md bg-accent px-4 py-2 font-medium text-background"
          >
            Accent button
          </button>
          <a href="#experience" className="text-accent underline underline-offset-4">
            Accent link
          </a>
        </div>
      </section>
    </main>
  );
}
