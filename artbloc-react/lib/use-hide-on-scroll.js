"use client";

import { useEffect, useState } from "react";

// Pure: hide only when scrolling DOWN past the threshold; reveal otherwise.
export function shouldHide({ y, lastY, threshold }) {
  if (y < threshold) return false;
  if (y > lastY) return true;
  return false;
}

export function useHideOnScroll({ threshold = 80 } = {}) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return; // never hide under reduced motion

    let lastY = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setHidden(shouldHide({ y, lastY, threshold }));
        lastY = y;
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return hidden;
}

// Pure: the header stays put whenever the mobile menu is open, so the ✕ can
// never scroll out of reach behind an open overlay.
export function headerHidden({ hidden, menuOpen }) {
  return hidden && !menuOpen;
}
