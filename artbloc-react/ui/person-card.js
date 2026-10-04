"use client";

import { useState } from "react";
import Image from "next/image";
import { colorClasses } from "@/lib/palette";
import { isVideo } from "@/lib/media";

// When `images` (an artist's gallery) is provided, each time the cursor enters
// the card (anywhere on it) the artwork advances to the next one, in order.
// Leaving does nothing, so moving in and out (or across cards) scans through
// the work. A two-layer double buffer crossfades: the new image is loaded into
// the hidden layer and only faded in once it has actually loaded, so there's no
// pop or flash. Nothing renders over the avatar until the first interaction, so
// there's no hydration concern. Without a gallery, it falls back to the single
// hoverImage crossfade.
export default function PersonCard({ image, hoverImage, images = [], primary, secondary, color = "coral" }) {
  const c = colorClasses(color);
  // Only still images swap; a video item can't go through next/image.
  const gallery = images.map((img) => img.src).filter((src) => src && !isVideo(src));
  const hasGallery = gallery.length > 0;
  // Start one before the avatar's own position so the first entry lands on a
  // different image (or on item 0 when the avatar is a headshot not in the set).
  const baseIdx = gallery.indexOf(image);

  // slots: the two buffered sources; front: which slot is visible; steps: how
  // many times the cursor has entered; pending: slot waiting on its image load.
  const [buf, setBuf] = useState({ slots: [null, null], front: 0, steps: 0, pending: -1 });

  function enter() {
    if (!hasGallery) return;
    setBuf((b) => {
      const steps = b.steps + 1;
      const idx = (((baseIdx + steps) % gallery.length) + gallery.length) % gallery.length;
      const back = 1 - b.front;
      const slots = [...b.slots];
      slots[back] = gallery[idx];
      return { ...b, slots, steps, pending: back };
    });
  }

  function onSlotLoad(i) {
    // Reveal the freshly loaded layer by making it the front (crossfade).
    setBuf((b) => (b.pending === i ? { ...b, front: i, pending: -1 } : b));
  }

  return (
    <div
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink/10 bg-parchment shadow-sm transition duration-200 hover:shadow-xl"
      onMouseEnter={enter}
    >
      <div className="relative aspect-square w-full overflow-hidden bg-cream">
        <Image
          src={image}
          alt={primary}
          width={400}
          height={400}
          className="h-full w-full object-cover transition-transform duration-300 motion-safe:group-hover:scale-105"
        />
        {hasGallery
          ? buf.slots.map((src, i) =>
              src ? (
                <Image
                  key={i}
                  src={src}
                  alt=""
                  aria-hidden="true"
                  width={400}
                  height={400}
                  onLoad={() => onSlotLoad(i)}
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
                    i === buf.front ? "opacity-100" : "opacity-0"
                  }`}
                />
              ) : null
            )
          : hoverImage ? (
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
