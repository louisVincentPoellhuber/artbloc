import Image from "next/image";

export default function CaptionedImage({ image, caption, variant = "full" }) {
  // "side" offsets past the page margin and rounds; "full" bleeds edge-to-edge.
  const wrapper = variant === "side" ? "w-full md:w-2/3 md:-ml-12" : "w-full";
  const radius = variant === "side" ? "rounded-2xl" : "";
  return (
    <figure className={wrapper}>
      <Image
        src={image}
        width={1200}
        height={800}
        alt={caption ?? ""}
        className={`h-auto w-full object-cover ${radius}`}
      />
      {caption ? (
        <figcaption className="mt-3 px-6 text-sm text-ink/60">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
