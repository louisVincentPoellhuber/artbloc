"use client";

import { useRef } from "react";

export default function Carousel({ children, label = "Carousel" }) {
  const trackRef = useRef(null);

  function scrollByDir(dir) {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  }

  return (
    <div className="relative mx-auto w-full max-w-6xl">
      <div
        ref={trackRef}
        role="group"
        aria-label={label}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-6 pb-4 [scrollbar-width:none]"
      >
        {children}
      </div>
      <button
        type="button"
        aria-label="Previous"
        onClick={() => scrollByDir(-1)}
        className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-cream/90 px-3 py-2 text-xl text-ink shadow-md transition hover:bg-cream"
      >
        ‹
      </button>
      <button
        type="button"
        aria-label="Next"
        onClick={() => scrollByDir(1)}
        className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-cream/90 px-3 py-2 text-xl text-ink shadow-md transition hover:bg-cream"
      >
        ›
      </button>
    </div>
  );
}
