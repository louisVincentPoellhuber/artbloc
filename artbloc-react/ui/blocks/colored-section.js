import { colorClasses } from "@/lib/palette";

export default function ColoredSection({ color = "coral", heading, text }) {
  const c = colorClasses(color);
  return (
    <section className={`w-full px-6 py-16 text-cream ${c.bg}`}>
      <div className="mx-auto max-w-3xl">
        {heading ? (
          <h2 className="mb-4 font-display text-3xl font-semibold md:text-4xl">{heading}</h2>
        ) : null}
        <p className="text-lg leading-relaxed">{text}</p>
      </div>
    </section>
  );
}
