"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useLightbox } from "@/ui/lightbox";
import { isVideo, webmFor } from "@/lib/media";

// Grid of an artist's work. The first item spans full width; the rest follow in
// source order. Clicking any item opens the zoom lightbox. Most items are
// images; a video item (a converted animation) also plays looped inline.
export default function ArtistGallery({ images = [] }) {
  const t = useTranslations("lightbox");
  const { open, overlay } = useLightbox(images);

  if (images.length === 0) return null;

  return (
    <div className="mx-auto w-full max-w-4xl px-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => open(i)}
            aria-label={img.alt ?? t("zoom")}
            className={`group block cursor-zoom-in overflow-hidden rounded-xl ${
              i === 0 ? "col-span-2 sm:col-span-3" : ""
            }`}
          >
            {isVideo(img.src) ? (
              <video
                autoPlay
                loop
                muted
                playsInline
                className="aspect-square w-full object-cover"
              >
                <source src={webmFor(img.src)} type="video/webm" />
                <source src={img.src} type="video/mp4" />
              </video>
            ) : (
              <Image
                src={img.src}
                alt={img.alt ?? ""}
                width={1200}
                height={900}
                className="aspect-square w-full object-cover transition-transform duration-300 motion-safe:group-hover:scale-105"
              />
            )}
          </button>
        ))}
      </div>
      {overlay}
    </div>
  );
}
