"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useLightbox } from "@/ui/lightbox";

// Static lookup so Tailwind sees the complete column classes at build time.
const COLS = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
};

export default function Gallery({ images, columns = 3 }) {
  const t = useTranslations("lightbox");
  const { open, overlay } = useLightbox(images);

  return (
    <div className="mx-auto w-full max-w-6xl px-6">
      <div className={`grid grid-cols-2 gap-3 ${COLS[columns] ?? COLS[3]}`}>
        {images.map((image, i) => (
          <button
            key={i}
            type="button"
            onClick={() => open(i)}
            aria-label={image.alt ?? t("zoom")}
            className="group block cursor-zoom-in overflow-hidden rounded-xl"
          >
            <Image
              src={image.src}
              alt={image.alt ?? ""}
              width={600}
              height={600}
              className="aspect-square w-full object-cover transition-transform duration-300 motion-safe:group-hover:scale-105"
            />
          </button>
        ))}
      </div>
      {overlay}
    </div>
  );
}
