// Scroll to a section and focus it, so the next Tab continues inside it.
// Used by the command palette and the mobile menu.
export function jumpTo(target: HTMLElement) {
  location.hash = target.id;
  target.scrollIntoView(); // also covers a hash that was already set
  target.tabIndex = -1;
  target.focus({ preventScroll: true });
}
