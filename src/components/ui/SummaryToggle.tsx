"use client";

import { useState, type ReactNode } from "react";
import { summaryToggle } from "@/content";

// Switches the hero summary between prose (passed as children) and TL;DR bullets. No animation.
export default function SummaryToggle({ bullets, children }: { bullets: string[]; children: ReactNode }) {
  const [tldr, setTldr] = useState(true);
  const tab = (on: boolean) =>
    `inline-flex min-h-11 items-center border-b-2 px-2 text-sm hover:text-accent motion-safe:transition-colors ${on ? "border-accent text-accent" : "border-transparent text-muted"}`;

  return (
    <div className="space-y-2">
      <div role="group" aria-label={summaryToggle.label} className="-mx-2 flex">
        <button type="button" aria-pressed={!tldr} onClick={() => setTldr(false)} className={tab(!tldr)}>
          {summaryToggle.summary}
        </button>
        <button type="button" aria-pressed={tldr} onClick={() => setTldr(true)} className={tab(tldr)}>
          {summaryToggle.tldr}
        </button>
      </div>
      {/* Both views share one grid cell, so the taller one sets the height and switching never shifts the page. The hidden one is visibility:hidden, so it is also out of the accessibility tree. */}
      <div className="grid max-w-prose">
        <ul role="list" className={`col-start-1 row-start-1 space-y-1 text-sm ${tldr ? "" : "invisible"}`}>
          {bullets.map((b) => (
            <li key={b} className="flex gap-2">
              <span aria-hidden="true" className="text-accent">
                &gt;
              </span>
              {b}
            </li>
          ))}
        </ul>
        <p className={`col-start-1 row-start-1 ${tldr ? "invisible" : ""}`}>{children}</p>
      </div>
    </div>
  );
}
