import Image from "next/image";

// Olive-labelled strip of last year's event photos.
export default function ArtBloc2025({ label, images = [] }) {
  if (images.length === 0) return null;
  return (
    <div className="mx-auto w-full max-w-4xl px-6">
      <span className="inline-block rounded-full bg-olive px-3 py-1 text-xs font-bold tracking-[0.06em] uppercase text-cream">
        {label}
      </span>
      <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
        {images.map((img) => (
          <Image
            key={img.src}
            src={img.src}
            alt={img.alt ?? ""}
            width={600}
            height={400}
            className="h-44 w-auto shrink-0 rounded-xl object-cover"
          />
        ))}
      </div>
    </div>
  );
}
