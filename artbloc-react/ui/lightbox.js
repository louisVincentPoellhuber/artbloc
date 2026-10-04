"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

/**
 * Zoom overlay for the image blocks. Blocks keep their own trigger markup and
 * call `open(i)`; the hook owns the open state and hands back the overlay to
 * render. Navigation stays inside the set it was given — blocks do not reach
 * across each other.
 */
export function useLightbox(images) {
  const [index, setIndex] = useState(null);
  const triggerRef = useRef(null);

  function open(i) {
    // Remember whatever had focus so Escape can hand it back.
    triggerRef.current = typeof document !== "undefined" ? document.activeElement : null;
    setIndex(i);
  }

  function close() {
    setIndex(null);
    triggerRef.current?.focus?.();
  }

  const overlay =
    index === null ? null : (
      <Lightbox images={images} index={index} onIndex={setIndex} onClose={close} />
    );

  return { open, overlay };
}

function Lightbox({ images, index, onIndex, onClose }) {
  const t = useTranslations("lightbox");
  const panelRef = useRef(null);
  const count = images.length;
  const image = images[index];

  // Arrow keys move through the set; Escape closes. Wrapping keeps a long
  // gallery navigable without hunting for the end.
  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      } else if (event.key === "ArrowRight" && count > 1) {
        onIndex((i) => (i + 1) % count);
      } else if (event.key === "ArrowLeft" && count > 1) {
        onIndex((i) => (i - 1 + count) % count);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [count, onClose, onIndex]);

  // aria-modal claims focus is contained, so Tab must not escape behind it.
  function handleKeyDown(event) {
    if (event.key !== "Tab") return;
    const focusable = panelRef.current?.querySelectorAll("button:not([disabled])");
    if (!focusable || focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  const arrow =
    "absolute top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-cream/90 text-2xl leading-none text-ink shadow-md transition hover:bg-cream";

  return (
    <div
      ref={panelRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label={t("label")}
      onKeyDown={handleKeyDown}
      onClick={onClose}
      className="fixed inset-0 z-40 flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm"
    >
      {/* object-contain, so the overlay finally shows the uncropped image. */}
      <Image
        src={image.src}
        alt={image.alt ?? ""}
        width={1600}
        height={1200}
        onClick={(event) => event.stopPropagation()}
        className="max-h-[85vh] w-auto max-w-[90vw] rounded-lg object-contain"
      />

      <button
        type="button"
        aria-label={t("close")}
        onClick={onClose}
        className="absolute top-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-cream/90 text-xl leading-none text-ink shadow-md transition hover:bg-cream"
      >
        ✕
      </button>

      {count > 1 ? (
        <>
          <button
            type="button"
            aria-label={t("previous")}
            onClick={(event) => {
              event.stopPropagation();
              onIndex((i) => (i - 1 + count) % count);
            }}
            className={`${arrow} left-4`}
          >
            ‹
          </button>
          <button
            type="button"
            aria-label={t("next")}
            onClick={(event) => {
              event.stopPropagation();
              onIndex((i) => (i + 1) % count);
            }}
            className={`${arrow} right-4`}
          >
            ›
          </button>
        </>
      ) : null}
    </div>
  );
}
