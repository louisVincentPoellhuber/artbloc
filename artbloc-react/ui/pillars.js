// The guiding values of Art Bloc, shown as a grid of teal cards on /about.
// Content comes from the caller (messages), so this stays a dumb presentational
// component — give it a heading and a list of { title, body }.
export default function Pillars({ heading, items = [] }) {
  return (
    <section className="mt-20">
      {heading ? (
        <h2 className="px-6 font-display text-4xl font-semibold text-ink md:text-5xl">
          {heading}{" "}
          <span className="text-teal" aria-hidden="true">
            ▪
          </span>
        </h2>
      ) : null}
      <div className="mx-auto mt-10 grid max-w-5xl gap-6 px-6 md:grid-cols-3">
        {items.map(({ title, body }) => (
          <div key={title} className="flex flex-col rounded-2xl bg-teal p-6 text-cream">
            <h3 className="font-display text-2xl font-semibold leading-tight">{title}</h3>
            <p className="mt-3 text-cream/90">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
