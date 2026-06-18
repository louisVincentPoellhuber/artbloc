"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";

export default function Carousel({ children, label }) {
  const t = useTranslations("carousel");
  const trackRef = useRef(null);

  function scrollByDir(dir) {
    const el = trackRef.current;
    if (!el) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: reduce ? "auto" : "smooth" });
  }

  return (
    <div className="relative mx-auto w-full max-w-6xl">
      <div
        ref={trackRef}
        role="group"
        aria-label={label ?? t("label")}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 motion-safe:scroll-smooth [scrollbar-width:none]"
      >
        {children}
      </div>
      <button
        type="button"
        aria-label={t("previous")}
        onClick={() => scrollByDir(-1)}
        className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-cream/90 px-3 py-2 text-xl text-ink shadow-md transition hover:bg-cream"
      >
        ‹
      </button>
      <button
        type="button"
        aria-label={t("next")}
        onClick={() => scrollByDir(1)}
        className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-cream/90 px-3 py-2 text-xl text-ink shadow-md transition hover:bg-cream"
      >
        ›
      </button>
    </div>
  );
}
