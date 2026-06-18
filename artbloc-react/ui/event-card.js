import Image from "next/image";
import { Link } from "@/i18n/navigation";

export default function EventCard({
  slug,
  title,
  date,
  venue,
  poster,
  status,
  orientation,
  ticketsUrl,
  discoverLabel,
  ticketsLabel,
}) {
  const upcoming = status === "upcoming";
  // Poster side is an explicit per-event choice (independent of upcoming/past):
  // "left" = poster left / panel right; "right" = mirrored (poster right). It
  // always tilts outward, away from the text. The left layout gets a little more
  // padding so the text/buttons sit further from the poster.
  const posterRight = orientation === "right";
  const posterPos = posterRight
    ? "order-last -ml-12 rotate-6"
    : "order-first -mr-12 -rotate-6";
  const panelPad = posterRight ? "pr-16" : "pl-24";

  return (
    <article className="group relative mx-auto flex w-full max-w-2xl items-center py-2 transition-transform duration-300 motion-safe:hover:scale-[1.01]">
      <div
        className={`relative z-10 w-52 shrink-0 ${posterPos} transition-transform duration-300 motion-safe:group-hover:scale-105`}
      >
        <Image
          src={poster}
          alt=""
          width={420}
          height={560}
          className="h-auto w-full rounded-xl object-cover shadow-2xl"
        />
      </div>
      <div
        className={`flex-1 rounded-2xl bg-olive p-8 text-cream shadow-lg transition motion-safe:group-hover:-translate-y-1 ${panelPad}`}
      >
        <h3 className="font-display text-3xl font-semibold md:text-4xl">{title}</h3>
        <p className="mt-2 text-lg text-cream/80">{date}</p>
        {venue ? <p className="text-lg text-cream/80">{venue}</p> : null}
        <div className="mt-6 flex flex-wrap gap-4">
          <Link
            href={`/events/${slug}`}
            className="rounded-full bg-coral-soft px-7 py-3 text-base font-medium text-ink transition hover:bg-coral hover:text-cream"
          >
            {discoverLabel}
          </Link>
          {upcoming && ticketsUrl ? (
            <a
              href={ticketsUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-coral px-7 py-3 text-base font-medium text-cream transition hover:bg-coral-soft hover:text-ink"
            >
              {ticketsLabel}
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
