"use client";

import { useState } from "react";
import Image from "next/image";
import { colorClasses } from "@/lib/palette";
import { isVideo, webmFor } from "@/lib/media";

// The card's hover rotation is the avatar/headshot followed by the artist's
// gallery (videos included), de-duplicated and kept in order. Each time the
// cursor enters the card it advances to the next item and crossfades to it.
// Layers mount lazily as they're reached and stay mounted; a new layer is only
// revealed once its media has loaded, so nothing pops or flashes, and the
// avatar is just the first item rather than a separate layer peeking through.
// With fewer than two items (e.g. team cards), it falls back to the base image
// plus an optional hoverImage crossfade.
export default function PersonCard({ image, hoverImage, images = [], primary, secondary, color = "coral" }) {
  const c = colorClasses(color);
  const media = [image, ...images.map((img) => img.src)].filter(Boolean);
  const rotation = media.filter((src, i) => media.indexOf(src) === i); // dedupe, keep order
  const canRotate = rotation.length > 1;

  // shown: index currently visible; pending: index loading to become shown;
  // mounted/loaded: indices that have been reached / have finished loading.
  const [r, setR] = useState({ shown: 0, pending: -1, mounted: [0], loaded: [] });

  function enter() {
    if (!canRotate) return;
    setR((s) => {
      const next = (s.shown + 1) % rotation.length;
      const mounted = s.mounted.includes(next) ? s.mounted : [...s.mounted, next];
      // Already loaded → switch now; otherwise mount it and wait for its load.
      if (s.loaded.includes(next)) return { ...s, shown: next, pending: -1, mounted };
      return { ...s, pending: next, mounted };
    });
  }

  function onLoaded(i) {
    setR((s) => {
      const loaded = s.loaded.includes(i) ? s.loaded : [...s.loaded, i];
      return s.pending === i ? { ...s, loaded, shown: i, pending: -1 } : { ...s, loaded };
    });
  }

  const cardClass =
    "group flex h-full flex-col overflow-hidden rounded-2xl border border-ink/10 bg-parchment shadow-sm transition duration-200 hover:shadow-xl";
  const caption = (
    <>
      <div className={`px-4 pt-3 pb-1 font-display text-lg leading-tight font-semibold text-cream ${c.bg}`}>
        {primary}
      </div>
      {/* flex-1 so the colour reaches the card's bottom edge: a grid row
          stretches to its tallest card, and without this the shorter ones
          end in a strip of bare parchment. */}
      <div className={`flex-1 px-4 pb-3 text-sm text-ink/80 ${c.soft}`}>{secondary}</div>
    </>
  );

  if (!canRotate) {
    return (
      <div className={cardClass}>
        <div className="relative aspect-square w-full overflow-hidden bg-cream">
          <Image
            src={image}
            alt={primary}
            width={400}
            height={400}
            className="h-full w-full object-cover transition-transform duration-300 motion-safe:group-hover:scale-105"
          />
          {hoverImage ? (
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
        {caption}
      </div>
    );
  }

  return (
    <div className={cardClass} onMouseEnter={enter}>
      <div className="relative aspect-square w-full overflow-hidden bg-cream">
        {rotation.map((src, i) => {
          if (!r.mounted.includes(i)) return null;
          const visible = i === r.shown ? "opacity-100" : "opacity-0";
          const base = "absolute inset-0 h-full w-full object-cover transition-opacity duration-300";
          return isVideo(src) ? (
            <video
              key={i}
              autoPlay
              loop
              muted
              playsInline
              aria-hidden="true"
              onLoadedData={() => onLoaded(i)}
              className={`${base} ${visible}`}
            >
              <source src={webmFor(src)} type="video/webm" />
              <source src={src} type="video/mp4" />
            </video>
          ) : (
            <Image
              key={i}
              src={src}
              alt={i === 0 ? primary : ""}
              aria-hidden={i !== 0}
              width={400}
              height={400}
              onLoad={() => onLoaded(i)}
              className={`${base} ${visible} ${i === 0 ? "motion-safe:group-hover:scale-105" : ""}`}
            />
          );
        })}
      </div>
      {caption}
    </div>
  );
}
