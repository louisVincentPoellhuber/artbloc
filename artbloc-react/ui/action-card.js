export default function ActionCard({ title, body, href }) {
  return (
    <div className="flex flex-col rounded-2xl bg-coral p-6 text-cream">
      <h3 className="font-display text-2xl font-semibold leading-tight">{title}</h3>
      <p className="mt-3 flex-1 text-cream/90">{body}</p>
      <a
        href={href}
        aria-label={title}
        className="mt-6 inline-flex h-12 w-12 items-center justify-center self-end rounded-full bg-cream text-xl text-ink transition hover:bg-white"
      >
        →
      </a>
    </div>
  );
}
