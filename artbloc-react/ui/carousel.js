"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";

// Movement under this is a click, not a drag.
const DRAG_THRESHOLD_PX = 4;

export default function Carousel({ children, label }) {
  const t = useTranslations("carousel");
  const trackRef = useRef(null);
  const drag = useRef({ down: false, moved: false, startX: 0, startLeft: 0 });

  function scrollByDir(dir) {
    const el = trackRef.current;
    if (!el) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: reduce ? "auto" : "smooth" });
  }

  // Click-and-drag to scroll with a mouse. Touch/pen keep native scrolling.
  function onPointerDown(e) {
    if (e.pointerType && e.pointerType !== "mouse") return;
    const el = trackRef.current;
    if (!el) return;
    drag.current = {
      down: true,
      moved: false,
      captured: false,
      startX: e.clientX,
      startLeft: el.scrollLeft,
    };
  }

  function onPointerMove(e) {
    const d = drag.current;
    const el = trackRef.current;
    if (!d.down || !el) return;
    const dx = e.clientX - d.startX;
    if (!d.moved && Math.abs(dx) > DRAG_THRESHOLD_PX) {
      d.moved = true;
      // Capture only once this is genuinely a drag. Capturing on pointerdown
      // would retarget pointerup — and with it the click — to the track, so a
      // plain click would never reach the card's link.
      el.setPointerCapture?.(e.pointerId);
      d.captured = true;
    }
    if (!d.moved) return;
    el.scrollLeft = d.startLeft - dx;
  }

  function onPointerUp(e) {
    if (drag.current.captured) {
      trackRef.current?.releasePointerCapture?.(e.pointerId);
      drag.current.captured = false;
    }
    drag.current.down = false;
  }

  // Swallow the click that ends a drag so cards don't navigate mid-swipe.
  function onClickCapture(e) {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  }

  return (
    <div className="relative mx-auto w-full max-w-6xl">
      <div
        ref={trackRef}
        role="group"
        aria-label={label ?? t("label")}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onClickCapture={onClickCapture}
        onDragStart={(e) => e.preventDefault()}
        className="flex cursor-grab snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 select-none active:cursor-grabbing [scrollbar-width:none]"
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
