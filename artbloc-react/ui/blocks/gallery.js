import Image from "next/image";

// Static lookup so Tailwind sees the complete column classes at build time.
const COLS = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
};

export default function Gallery({ images, columns = 3 }) {
  return (
    <div className="mx-auto w-full max-w-6xl px-6">
      <div className={`grid grid-cols-2 gap-3 ${COLS[columns] ?? COLS[3]}`}>
        {images.map((image, i) => (
          <Image
            key={i}
            src={image.src}
            alt={image.alt ?? ""}
            width={600}
            height={600}
            className="aspect-square w-full rounded-xl object-cover"
          />
        ))}
      </div>
    </div>
  );
}
