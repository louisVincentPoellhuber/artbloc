import Image from "next/image";
import { colorClasses } from "@/lib/palette";

export default function PersonCard({ image, primary, secondary, color = "coral" }) {
  const c = colorClasses(color);
  return (
    <div className="flex w-full flex-col overflow-hidden border-2 border-ink/10">
      <Image
        src={image}
        alt={primary}
        width={360}
        height={360}
        className="aspect-square w-full object-cover"
      />
      <div className={`px-4 py-2 text-lg text-cream ${c.bg}`}>{primary}</div>
      <div className={`px-4 py-1 text-sm text-cream ${c.soft}`}>{secondary}</div>
    </div>
  );
}
