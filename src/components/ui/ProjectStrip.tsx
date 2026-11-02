"use client";

import { useId, useRef, useState, type ReactNode } from "react";
import { projectStrip } from "@/content";

const button =
  "inline-flex size-11 items-center justify-center rounded-sm border border-border hover:border-accent hover:text-accent aria-disabled:opacity-40 aria-disabled:hover:border-border aria-disabled:hover:text-foreground";

const arrow = (d: string) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className="size-5"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d={d} />
  </svg>
);

// Desktop strip: one project per slide, scrolled sideways with CSS snap. The browser handles arrows, swipe and Shift+wheel;
// a plain vertical wheel still scrolls the page. This component only draws the buttons and the "01 / 04" count.
// Rendered hidden (display: none) outside the strip gate, so it costs nothing there.
export default function ProjectStrip({
  heading,
  count,
  children,
}: {
  heading: ReactNode;
  count: number;
  children: ReactNode;
}) {
  const stripRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const id = useId();

  // One slide plus its gap, measured from the first two slides so no number is hard-coded.
  const step = () => {
    const slides = stripRef.current?.querySelectorAll("li");
    return slides && slides.length > 1 ? slides[1].offsetLeft - slides[0].offsetLeft : 0;
  };

  const onScroll = () => {
    const el = stripRef.current;
    const size = step();
    if (!el || !size) return;
    // The last slide cannot snap to the start edge, so the end of the strip counts as the last slide.
    const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 1;
    setIndex(atEnd ? count - 1 : Math.min(count - 1, Math.round(el.scrollLeft / size)));
  };

  const move = (direction: 1 | -1) => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    stripRef.current?.scrollBy({ left: direction * step(), behavior: reduced ? "auto" : "smooth" });
  };

  const atStart = index === 0;
  const atEnd = index === count - 1;

  return (
    <div className="hidden strip:block">
      <div className="mb-12 flex items-center justify-between gap-4">
        {heading}
        <div className="flex items-center gap-3">
          {/* Plain text, not a live region: it changes on every scroll and should not be announced. */}
          <p className="text-sm text-muted tabular-nums">
            {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </p>
          {/* aria-disabled, not disabled: a disabled button drops keyboard focus when it reaches the end. */}
          <button
            type="button"
            aria-controls={id}
            aria-disabled={atStart}
            onClick={() => !atStart && move(-1)}
            className={button}
          >
            <span className="sr-only">{projectStrip.previous}</span>
            {arrow("m15 6-6 6 6 6")}
          </button>
          <button
            type="button"
            aria-controls={id}
            aria-disabled={atEnd}
            onClick={() => !atEnd && move(1)}
            className={button}
          >
            <span className="sr-only">{projectStrip.next}</span>
            {arrow("m9 6 6 6-6 6")}
          </button>
        </div>
      </div>
      {/* Focusable so the arrow keys scroll it. The 4px padding (cancelled by the negative margin) and scroll padding keep focus rings from being clipped.
          relative: the slides' sr-only link text is position: absolute, and without a positioned ancestor it escapes the scroller and widens the page. */}
      <div
        ref={stripRef}
        id={id}
        role="region"
        aria-label={projectStrip.region}
        tabIndex={0}
        onScroll={onScroll}
        className="relative -mx-1 -mt-1 scroll-px-1 snap-x snap-mandatory overflow-x-auto overscroll-x-contain px-1 pt-1 pb-3"
      >
        <ol role="list" className="flex gap-6">
          {children}
        </ol>
      </div>
    </div>
  );
}
