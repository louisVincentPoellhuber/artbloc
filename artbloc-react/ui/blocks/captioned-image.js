"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useLightbox } from "@/ui/lightbox";

export default function CaptionedImage({ image, caption, variant = "full" }) {
  const t = useTranslations("lightbox");
  // A single image is a set of one — the overlay renders without arrows.
  const { open, overlay } = useLightbox([{ src: image, alt: caption }]);

  // "side" offsets past the page margin and rounds; "full" bleeds edge-to-edge.
  const wrapper = variant === "side" ? "w-full md:w-2/3 md:-ml-12" : "w-full";
  const radius = variant === "side" ? "rounded-2xl" : "";

  return (
    <figure className={wrapper}>
      <button
        type="button"
        onClick={() => open(0)}
        aria-label={caption ?? t("zoom")}
        className={`block w-full cursor-zoom-in ${radius} overflow-hidden`}
      >
        <Image
          src={image}
          width={1200}
          height={800}
          alt={caption ?? ""}
          className="h-auto w-full object-cover"
        />
      </button>
      {caption ? (
        <figcaption className="mt-3 px-6 text-sm text-ink/60">{caption}</figcaption>
      ) : null}
      {overlay}
    </figure>
  );
}
