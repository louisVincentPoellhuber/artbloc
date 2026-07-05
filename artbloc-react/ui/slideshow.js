"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Slideshow({ images, interval = 5000 }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = setInterval(() => setActive((i) => (i + 1) % images.length), interval);
    return () => clearInterval(id);
  }, [images.length, interval]);

  return (
    <div className="absolute inset-0">
      {images.map((src, i) => (
        <Image
          key={i}
          src={src}
          alt=""
          fill
          sizes="100vw"
          className={`object-cover transition-opacity duration-1000 ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}
