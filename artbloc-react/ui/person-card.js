"use client";

import { useState } from "react";
import Image from "next/image";
import { colorClasses } from "@/lib/palette";
import { isVideo } from "@/lib/media";

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// When `images` (an artist's gallery) is provided, moving the mouse across the
// card scrubs through those artworks in a shuffled order — a quick way to scan
// an artist's work. The shuffle is built lazily on first hover (client only, so
// no hydration mismatch). Without a gallery, it falls back to the single
// hoverImage crossfade.
export default function PersonCard({ image, hoverImage, images = [], primary, secondary, color = "coral" }) {
  const c = colorClasses(color);
  // Only still images scrub; a video item can't go through next/image.
  const gallery = images.map((img) => img.src).filter((src) => src && !isVideo(src));
  const hasGallery = gallery.length > 0;

  // Shuffle once on mount. The order only feeds the hover overlay, which never
  // renders before the first mouse interaction, so the server/client shuffle
  // difference is never reflected in the initial DOM (no hydration mismatch).
  const [order] = useState(() => shuffle(gallery));
  const [active, setActive] = useState(-1); // -1 = show the base avatar

  function enter() {
    if (hasGallery) setActive(0);
  }
  function scrub(e) {
    if (!hasGallery) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = rect.width ? (e.clientX - rect.left) / rect.width : 0;
    const idx = Math.min(order.length - 1, Math.max(0, Math.floor(ratio * order.length)));
    setActive(idx);
  }
  function leave() {
    setActive(-1);
  }

  const scrubSrc = hasGallery && active >= 0 ? order[active] : null;

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink/10 bg-parchment shadow-sm transition duration-200 hover:shadow-xl motion-safe:hover:-translate-y-1">
      <div
        className="relative aspect-square w-full overflow-hidden bg-cream"
        onMouseEnter={enter}
        onMouseMove={scrub}
        onMouseLeave={leave}
      >
        <Image
          src={image}
          alt={primary}
          width={400}
          height={400}
          className="h-full w-full object-cover transition-transform duration-300 motion-safe:group-hover:scale-105"
        />
        {hasGallery ? (
          scrubSrc ? (
            <Image
              key={scrubSrc}
              src={scrubSrc}
              alt=""
              aria-hidden="true"
              width={400}
              height={400}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : null
        ) : hoverImage ? (
          <Image
            src={hoverImage}
            alt=""
            aria-hidden="true"
            width={400}
            height={400}
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 motion-safe:group-hover:opacity-100"
          />
        ) : null}
      </div>
      <div
        className={`px-4 pt-3 pb-1 font-display text-lg leading-tight font-semibold text-cream ${c.bg}`}
      >
        {primary}
      </div>
      <div className={`px-4 pb-3 text-sm text-ink/80 ${c.soft}`}>{secondary}</div>
    </div>
  );
}
