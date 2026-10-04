import Image from "next/image";

// Grid of an artist's images. The first image (headshot or lead artwork) spans
// full width; the rest follow in source order. Renders nothing when empty.
export default function ArtistGallery({ images = [] }) {
  if (images.length === 0) return null;
  return (
    <div className="mx-auto grid w-full max-w-4xl grid-cols-2 gap-3 px-6 sm:grid-cols-3">
      {images.map((img, i) => (
        <div
          key={img.src}
          className={`relative overflow-hidden rounded-xl ${i === 0 ? "col-span-2 sm:col-span-3" : ""}`}
        >
          <Image
            src={img.src}
            alt={img.alt ?? ""}
            width={1200}
            height={900}
            className="h-full w-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}
