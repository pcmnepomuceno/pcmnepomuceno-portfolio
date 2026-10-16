"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { jumpTo } from "@/components/ui/jump";
import { menu, nav, profile } from "@/content";

// The whole header row is one nav landmark, so exactly one exists at every width and
// DOM order matches visual order: name, links (sm and up) or menu button (below sm),
// then the tools passed as children, then the menu panel, which overlays the page below.
export default function SiteNav({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  // "home" matches the server render; the observer corrects it after mount.
  const [active, setActive] = useState(nav[0].toLowerCase());
  const locked = useRef(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  // The section crossing a thin line 35% down the viewport is current; at the very bottom
  // (footer fully visible) it is the last one, since Contact is too short to reach the line.
  useEffect(() => {
    const ids = nav.map((item) => item.toLowerCase());
    const crossing = new Set<string>();
    let atBottom = false;
    const update = () => {
      if (locked.current) return; // a click just set it; ignore the jump's passes
      const id = atBottom ? ids[ids.length - 1] : ids.findLast((i) => crossing.has(i));
      if (id) setActive(id);
    };
    const sections = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) crossing.add(e.target.id);
          else crossing.delete(e.target.id);
        }
        update();
      },
      { rootMargin: "-35% 0px -64% 0px" },
    );
    const footer = new IntersectionObserver(
      ([e]) => {
        atBottom = e.isIntersecting;
        update();
      },
      { threshold: 1 },
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) sections.observe(el);
    }
    const foot = document.querySelector("footer");
    if (foot) footer.observe(foot);
    return () => {
      sections.disconnect();
      footer.disconnect();
    };
  }, []);

  const select = (id: string) => {
    setActive(id);
    locked.current = true;
    setTimeout(() => (locked.current = false), 300);
  };

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      } else if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        setOpen(false); // the palette is opening
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!buttonRef.current?.closest("header")?.contains(event.target as Node)) setOpen(false);
    };
    // Close when the window crosses sm, where the panel is hidden.
    const wide = matchMedia("(min-width: 40rem)");
    const close = () => setOpen(false);
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    wide.addEventListener("change", close);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      wide.removeEventListener("change", close);
    };
  }, [open]);

  return (
    <nav
      aria-label="Primary"
      className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-2"
    >
      <a
        href="#home"
        className="inline-flex min-h-11 grow basis-0 items-center font-serif text-lg sm:min-h-0 sm:grow-0 sm:basis-auto hover:text-accent motion-safe:transition-colors"
      >
        {profile.name}
      </a>
      <div className="flex items-center gap-2 sm:flex-wrap sm:gap-x-3 sm:gap-y-0">
        <div className="hidden sm:block">
          {/* links carry the spacing as padding (44px hit area); -mx-2 keeps text aligned */}
          <ul role="list" className="-mx-2 flex flex-wrap font-mono text-sm">
            {nav.map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  onClick={() => select(item.toLowerCase())}
                  aria-current={active === item.toLowerCase() ? "location" : undefined}
                  className={`inline-flex min-h-11 min-w-11 items-center justify-center border-b-2 px-2 hover:text-accent motion-safe:transition-colors ${active === item.toLowerCase() ? "border-accent text-accent" : "border-transparent"}`}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <button
          ref={buttonRef}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen(!open)}
          className="inline-flex size-11 items-center justify-center rounded-md border border-border text-foreground hover:border-accent hover:text-accent sm:hidden"
        >
          <span className="sr-only">{open ? menu.close : menu.open}</span>
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="size-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d={open ? "M6 6l12 12M18 6 6 18" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
        <div className="flex items-center gap-2">{children}</div>
      </div>
      {/* Absolute under the sticky header, so opening or closing never shifts the page. */}
      <div
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full border-y border-border bg-background sm:hidden"
      >
        <ul role="list" className="mx-auto max-w-5xl px-4 py-2 font-mono text-sm">
          {nav.map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                onClick={(event) => {
                  const target = document.getElementById(item.toLowerCase());
                  if (!target) return;
                  event.preventDefault();
                  setOpen(false);
                  select(item.toLowerCase());
                  jumpTo(target);
                }}
                aria-current={active === item.toLowerCase() ? "location" : undefined}
                className={`flex min-h-11 items-center hover:text-accent ${active === item.toLowerCase() ? "text-accent" : ""}`}
              >
                <span aria-hidden="true" className={`w-[2ch] ${active === item.toLowerCase() ? "" : "invisible"}`}>
                  &gt;
                </span>
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
