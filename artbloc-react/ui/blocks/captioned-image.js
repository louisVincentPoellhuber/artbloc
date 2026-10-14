"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useLightbox } from "@/ui/lightbox";

export default function CaptionedImage({ image, caption, variant = "wide" }) {
  const t = useTranslations("lightbox");
  // A single image is a set of one — the overlay renders without arrows.
  const { open, overlay } = useLightbox([{ src: image, alt: caption }]);

  // "side" offsets past the page margin; "wide" is centred and capped at
  // max-w-5xl (1024px). That cap is the point where the event photography,
  // which is 2048px wide, renders 1:1 on a 2x screen — edge-to-edge upscaled
  // it and showed every bit of softness.
  const wrapper =
    variant === "side" ? "w-full md:w-2/3 md:-ml-12" : "mx-auto w-full max-w-5xl px-6";

  return (
    <figure className={wrapper}>
      <button
        type="button"
        onClick={() => open(0)}
        aria-label={caption ?? t("zoom")}
        className="block w-full cursor-zoom-in overflow-hidden rounded-2xl"
      >
        {/* Without `sizes`, the browser assumes full-viewport width and picks a
            candidate off the srcset that is softer than the space it fills. */}
        <Image
          src={image}
          width={2048}
          height={1400}
          sizes="(min-width: 1024px) 1024px, 100vw"
          alt={caption ?? ""}
          className="h-auto w-full object-cover"
        />
      </button>
      {caption ? (
        <figcaption className="mt-3 text-sm text-ink/60">{caption}</figcaption>
      ) : null}
      {overlay}
    </figure>
  );
}
