/**
 * Scroll to a homepage section by id, waiting for it to exist.
 * Homepage sections below the fold are lazy-loaded, so after navigating
 * home we may need to wait a few frames for the target to mount.
 */
export function scrollToSection(id: string, attempts = 40) {
  const tick = () => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      return;
    }
    if (attempts-- > 0) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
