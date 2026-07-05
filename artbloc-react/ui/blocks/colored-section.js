import { colorClasses } from "@/lib/palette";
import TexturedBackground from "@/ui/textured-background";

export default function ColoredSection({ color = "coral", heading, text }) {
  const c = colorClasses(color);
  return (
    <section className={`relative w-full overflow-hidden px-6 py-16 text-cream ${c.bg}`}>
      <TexturedBackground variant={color} />
      <div className="relative z-10 mx-auto max-w-3xl">
        {heading ? (
          <h2 className="mb-4 font-display text-3xl font-semibold md:text-4xl">{heading}</h2>
        ) : null}
        <p className="text-lg leading-relaxed">{text}</p>
      </div>
    </section>
  );
}
