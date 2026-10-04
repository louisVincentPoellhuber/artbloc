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

// When `images` (an artist's gallery) is provided, each time the cursor enters
// the card the artwork swaps to the next one in a shuffled order. Leaving does
// nothing, so moving in and out (or across cards) scans through the work. The
// shuffle is built lazily on mount; the overlay never renders before the first
// interaction, so the server/client shuffle difference is never in the initial
// DOM (no hydration mismatch). Without a gallery, it falls back to the single
// hoverImage crossfade.
export default function PersonCard({ image, hoverImage, images = [], primary, secondary, color = "coral" }) {
  const c = colorClasses(color);
  // Only still images swap; a video item can't go through next/image.
  const gallery = images.map((img) => img.src).filter((src) => src && !isVideo(src));
  const hasGallery = gallery.length > 0;

  const [order] = useState(() => shuffle(gallery));
  const [active, setActive] = useState(-1); // -1 = show the base avatar

  function enter() {
    // Advance to the next artwork on every entry; the shown image persists.
    if (hasGallery) setActive((prev) => (prev + 1) % order.length);
  }

  const shownSrc = hasGallery && active >= 0 ? order[active] : null;

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink/10 bg-parchment shadow-sm transition duration-200 hover:shadow-xl motion-safe:hover:-translate-y-1">
      <div
        className="relative aspect-square w-full overflow-hidden bg-cream"
        onMouseEnter={enter}
      >
        <Image
          src={image}
          alt={primary}
          width={400}
          height={400}
          className="h-full w-full object-cover transition-transform duration-300 motion-safe:group-hover:scale-105"
        />
        {hasGallery ? (
          shownSrc ? (
            <Image
              key={shownSrc}
              src={shownSrc}
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
