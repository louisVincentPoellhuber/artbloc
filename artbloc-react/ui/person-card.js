import Image from "next/image";
import { colorClasses } from "@/lib/palette";

export default function PersonCard({ image, primary, secondary, color = "coral" }) {
  const c = colorClasses(color);
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink/10 bg-parchment shadow-sm transition duration-200 hover:shadow-xl motion-safe:hover:-translate-y-1">
      <div className="aspect-square w-full overflow-hidden bg-cream">
        <Image
          src={image}
          alt={primary}
          width={400}
          height={400}
          className="h-full w-full object-cover transition-transform duration-300 motion-safe:group-hover:scale-105"
        />
      </div>
      <div
        className={`px-4 pt-3 pb-1 font-display text-lg leading-tight font-semibold text-cream ${c.bg}`}
      >
        {primary}
      </div>
      <div className={`px-4 pb-3 text-sm text-ink/80 ${c.soft}`}>{secondary}</div>
    </div>
  );
}
