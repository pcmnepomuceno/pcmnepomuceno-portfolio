// Runs cb once the current scroll ends. scrollend is missing in older Safari, and it never fires when
// nothing scrolls, so a timeout backs it up.
export function afterScroll(cb: () => void) {
  let done = false;
  const finish = () => {
    if (done) return;
    done = true;
    clearTimeout(timer);
    removeEventListener("scrollend", finish);
    cb();
  };
  const timer = setTimeout(finish, 1000);
  addEventListener("scrollend", finish);
}

// Restarts the heading underline (see globals.css) once the jump has landed. No-op under reduced motion.
export function flash(section: HTMLElement) {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  afterScroll(() => {
    section.removeAttribute("data-flash");
    void section.offsetWidth; // restart the animation
    section.setAttribute("data-flash", "");
  });
}

// Scroll to a section and focus it, so the next Tab continues inside it.
// Used by the command palette and the mobile menu.
export function jumpTo(target: HTMLElement) {
  // SiteNav listens: it marks the section current and holds scroll-spy until the scroll ends.
  dispatchEvent(new CustomEvent("jump", { detail: target.id }));
  location.hash = target.id;
  target.scrollIntoView(); // also covers a hash that was already set
  target.tabIndex = -1;
  target.focus({ preventScroll: true });
  flash(target);
}
