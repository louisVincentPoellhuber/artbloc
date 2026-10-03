"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

function shuffledOrder(n) {
  const order = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

export default function Slideshow({ images, interval = 5000, randomize = true }) {
  const [active, setActive] = useState(0);
  // Start in source order so the server and first client render agree (no
  // hydration mismatch); reshuffle after mount, so each reload gets a fresh
  // order. Math.random() during render would break hydration — hence useEffect.
  const [order, setOrder] = useState(() => images.map((_, i) => i));

  useEffect(() => {
    if (randomize) setOrder(shuffledOrder(images.length));
  }, [randomize, images.length]);

  useEffect(() => {
    if (images.length < 2) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = setInterval(() => setActive((i) => (i + 1) % images.length), interval);
    return () => clearInterval(id);
  }, [images.length, interval]);

  return (
    <div className="absolute inset-0">
      {order.map((imageIndex, position) => (
        <Image
          key={imageIndex}
          src={images[imageIndex]}
          alt=""
          fill
          sizes="100vw"
          className={`object-cover transition-opacity duration-1000 ${
            position === active ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}
