const CARD = "relative flex flex-col rounded-2xl bg-coral p-6 text-cream";
const ARROW =
  "mt-6 inline-flex h-12 w-12 items-center justify-center self-end rounded-full bg-cream text-xl text-ink";

export default function ActionCard({ title, body, href }) {
  // A destination that isn't set yet renders as a plain card. Stretching a hit
  // area over the whole thing and sending it nowhere is worse than not linking.
  if (!href) {
    return (
      <div className={CARD}>
        <h3 className="font-display text-2xl font-semibold leading-tight">{title}</h3>
        <p className="mt-3 flex-1 text-cream/90">{body}</p>
        <span aria-hidden="true" className={ARROW}>
          →
        </span>
      </div>
    );
  }

  // Anything off-site opens in a new tab; mailto: and internal paths do not.
  const external = /^https?:/i.test(href);

  return (
    <div className={`${CARD} transition hover:shadow-xl motion-safe:hover:-translate-y-1`}>
      <h3 className="font-display text-2xl font-semibold leading-tight">{title}</h3>
      <p className="mt-3 flex-1 text-cream/90">{body}</p>
      {/* One anchor, stretched over the card with after:inset-0 — the whole card
          is clickable without a second link duplicating it in the tab order. */}
      <a
        href={href}
        aria-label={title}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        className={`${ARROW} transition after:absolute after:inset-0 hover:bg-white`}
      >
        →
      </a>
    </div>
  );
}
