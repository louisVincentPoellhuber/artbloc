import Image from "next/image";

export default function TextImage({ text, image, alt, side = "left" }) {
  const imageFirst = side === "left";
  return (
    <div className="mx-auto grid w-full max-w-5xl items-center gap-8 px-6 md:grid-cols-2">
      <div className={imageFirst ? "md:order-1" : "md:order-2"}>
        <Image
          src={image}
          alt={alt ?? ""}
          width={800}
          height={600}
          className="h-auto w-full rounded-2xl object-cover"
        />
      </div>
      <p
        className={`text-lg leading-relaxed text-ink/80 ${
          imageFirst ? "md:order-2" : "md:order-1"
        }`}
      >
        {text}
      </p>
    </div>
  );
}
