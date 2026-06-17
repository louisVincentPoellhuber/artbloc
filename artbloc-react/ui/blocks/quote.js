export default function Quote({ text, attribution }) {
  return (
    <figure className="mx-auto w-full max-w-3xl px-6 text-center">
      <blockquote className="font-display text-3xl leading-snug text-ink md:text-4xl">
        {text}
      </blockquote>
      {attribution ? (
        <figcaption className="mt-4 text-sm tracking-wide text-ink/60 uppercase">
          — {attribution}
        </figcaption>
      ) : null}
    </figure>
  );
}
