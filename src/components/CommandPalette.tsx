"use client";

import { useEffect, useEffectEvent, useId, useRef, useState, type KeyboardEvent } from "react";
import { useTheme } from "next-themes";
import { cv, nav, palette } from "@/content";

type Command =
  | { kind: "section"; label: string; section: string }
  | { kind: "theme"; label: string }
  | { kind: "cv"; label: string };

const commands: Command[] = [
  ...nav.map((item) => ({
    kind: "section" as const,
    label: `${palette.goTo} ${item}`,
    section: item.toLowerCase(),
  })),
  { kind: "theme", label: palette.toggleTheme },
  { kind: "cv", label: cv.label },
];

export default function CommandPalette() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  // Section id to focus after close; null sends focus back to the trigger.
  const jumpRef = useRef<string | null>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [announcement, setAnnouncement] = useState("");
  const { setTheme } = useTheme();
  const id = useId();
  const listId = `${id}-list`;
  const optionId = (i: number) => `${id}-option-${i}`;

  const open = () => {
    setQuery("");
    setActive(0);
    setAnnouncement("");
    dialogRef.current?.showModal();
    inputRef.current?.focus();
  };
  const close = () => dialogRef.current?.close();

  const filtered = commands.filter((command) =>
    command.label.toLowerCase().includes(query.toLowerCase()),
  );

  const run = (command: Command) => {
    if (command.kind === "theme") {
      // Reads the class next-themes sets before hydration, like ThemeToggle, so the label never changes.
      const next = document.documentElement.classList.contains("dark") ? "light" : "dark";
      setTheme(next);
      setAnnouncement(palette.themeChanged[next]);
    } else if (command.kind === "cv") {
      const link = document.createElement("a");
      link.href = cv.href;
      link.download = "";
      link.click();
    } else {
      jumpRef.current = command.section;
    }
    close();
  };

  const onShortcut = useEffectEvent((event: globalThis.KeyboardEvent) => {
    if (event.defaultPrevented || event.repeat) return;
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      if (dialogRef.current?.open) close();
      else open();
    }
  });
  useEffect(() => {
    document.addEventListener("keydown", onShortcut);
    return () => document.removeEventListener("keydown", onShortcut);
  }, []);

  // Esc, the shortcut and every command end here. The browser restores focus to whatever
  // had it before showModal, which is not the trigger when the shortcut opened the palette.
  const onClose = () => {
    const target = jumpRef.current && document.getElementById(jumpRef.current);
    jumpRef.current = null;
    if (target) {
      location.hash = target.id;
      target.scrollIntoView(); // also covers a hash that was already set
      target.tabIndex = -1;
      target.focus({ preventScroll: true });
    } else {
      triggerRef.current?.focus({ preventScroll: true });
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing) return;
    const count = filtered.length;
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!count) return;
      const next = (active + (event.key === "ArrowDown" ? 1 : -1) + count) % count;
      setActive(next);
      document.getElementById(optionId(next))?.scrollIntoView({ block: "nearest" });
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (filtered[active]) run(filtered[active]);
    }
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={open}
        aria-haspopup="dialog"
        aria-keyshortcuts="Control+K Meta+K"
        className="hidden min-h-11 min-w-11 items-center justify-center gap-2 rounded-md border border-border px-3 text-foreground hover:border-accent hover:text-accent sm:inline-flex"
      >
        <span className="sr-only">{palette.trigger}</span>
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
          <path d="m5 7 5 5-5 5" />
          <path d="M12 17h7" />
        </svg>
        <kbd aria-hidden="true" className="hidden font-mono text-xs text-muted sm:inline">
          {palette.hint}
        </kbd>
      </button>
      {/* Scrim is black, not a token: foreground is near-white in dark mode and would lighten the page.
          Literal rgb, not bg-black/50, which compiles to var(--color-black); older Safari's ::backdrop can't read custom properties. */}
      <dialog
        ref={dialogRef}
        aria-label={palette.dialog}
        onClose={onClose}
        className="m-auto mt-16 w-[calc(100%-2rem)] max-w-lg rounded-md border border-border bg-background p-0 text-foreground backdrop:bg-[rgb(0_0_0/0.5)]"
      >
        <input
          ref={inputRef}
          type="text"
          role="combobox"
          aria-label={palette.input}
          placeholder={palette.placeholder}
          aria-autocomplete="list"
          aria-expanded={filtered.length > 0}
          aria-controls={filtered.length > 0 ? listId : undefined}
          aria-activedescendant={filtered.length > 0 ? optionId(active) : undefined}
          autoComplete="off"
          spellCheck={false}
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setActive(0);
          }}
          onKeyDown={onKeyDown}
          className="w-full border-b border-border bg-transparent px-4 py-3 font-mono text-sm -outline-offset-2 placeholder:text-muted"
        />
        {filtered.length > 0 && (
          <ul id={listId} role="listbox" className="max-h-[60vh] overflow-y-auto py-2">
            {filtered.map((command, i) => (
              <li
                key={command.label}
                id={optionId(i)}
                role="option"
                aria-selected={i === active}
                // Keep focus in the input so the combobox stays the focused element.
                onMouseDown={(event) => event.preventDefault()}
                onMouseMove={() => setActive(i)}
                onClick={() => run(command)}
                className={`flex min-h-11 cursor-pointer items-center px-4 font-mono text-sm ${i === active ? "bg-foreground/5 text-accent" : ""}`}
              >
                {command.label}
              </li>
            ))}
          </ul>
        )}
        <p role="status" className="px-4 py-3 font-mono text-sm text-muted empty:hidden">
          {filtered.length === 0 && palette.empty}
        </p>
      </dialog>
      {/* Outside the dialog so it is not hidden when the dialog closes; cleared on open so each toggle is one change. */}
      <p role="status" className="sr-only">
        {announcement}
      </p>
    </>
  );
}
