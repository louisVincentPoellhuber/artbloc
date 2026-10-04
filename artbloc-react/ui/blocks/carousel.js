"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import Carousel from "@/ui/carousel";
import { useLightbox } from "@/ui/lightbox";

export default function CarouselBlock({ images }) {
  const t = useTranslations("lightbox");
  const { open, overlay } = useLightbox(images);

  return (
    <>
      <Carousel>
        {images.map((image, i) => (
          <div key={i} className="w-72 shrink-0 snap-start sm:w-96">
            {/* Carousel swallows the click that ends a drag, so dragging across
                the track never opens the overlay. */}
            <button
              type="button"
              onClick={() => open(i)}
              aria-label={image.alt ?? t("zoom")}
              className="block w-full cursor-zoom-in overflow-hidden rounded-2xl"
            >
              <Image
                src={image.src}
                alt={image.alt ?? ""}
                width={800}
                height={600}
                className="h-64 w-full object-cover"
              />
            </button>
          </div>
        ))}
      </Carousel>
      {overlay}
    </>
  );
}
