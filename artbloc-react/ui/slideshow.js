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
  // Images render in source order and `active` starts at 0, so the server and
  // first client render agree (no hydration mismatch, no first-frame flash).
  // The play order is a random permutation built on the client and walked by
  // the interval below — randomness never touches render, so hydration is safe.
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const n = images.length;
    const order = randomize ? shuffledOrder(n) : Array.from({ length: n }, (_, i) => i);
    let pos = 0; // index into `order`; the first visible image is always images[0]
    const id = setInterval(() => {
      pos = (pos + 1) % order.length;
      setActive(order[pos]);
    }, interval);
    return () => clearInterval(id);
  }, [images.length, interval, randomize]);

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
