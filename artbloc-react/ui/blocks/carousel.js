import Image from "next/image";
import Carousel from "@/ui/carousel";

export default function CarouselBlock({ images }) {
  return (
    <Carousel>
      {images.map((image, i) => (
        <div key={i} className="w-72 shrink-0 snap-start sm:w-96">
          <Image
            src={image.src}
            alt={image.alt ?? ""}
            width={800}
            height={600}
            className="h-64 w-full rounded-2xl object-cover"
          />
        </div>
      ))}
    </Carousel>
  );
}
