import type Lenis from "lenis";

let instance: Lenis | null = null;

export function setLenisInstance(lenis: Lenis | null) {
  instance = lenis;
}

/**
 * Scroll smoothly via the active Lenis instance, with a graceful fallback to
 * the native API when Lenis hasn't mounted yet (or has been torn down).
 */
export function smoothScrollTo(target: HTMLElement | number): void {
  if (instance) {
    instance.scrollTo(target, { duration: 1.4 });
    return;
  }
  if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: "smooth" });
  } else {
    target.scrollIntoView({ behavior: "smooth" });
  }
}
