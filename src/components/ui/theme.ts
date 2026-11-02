import { flushSync } from "react-dom";

// Flips the theme and returns the new one. Reads the class next-themes sets before hydration, so it is right even
// before React runs. flushSync makes next-themes' effect put the class on <html> before the new snapshot is taken.
// Without View Transitions, or under reduced motion, the swap is instant.
export function toggleTheme(setTheme: (theme: string) => void): "light" | "dark" {
  const next = document.documentElement.classList.contains("dark") ? "light" : "dark";
  const swap = () => flushSync(() => setTheme(next));
  if (!document.startViewTransition || matchMedia("(prefers-reduced-motion: reduce)").matches) swap();
  else document.startViewTransition(swap);
  return next;
}
