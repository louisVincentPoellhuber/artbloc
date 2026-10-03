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
  // The tilt and the overlap are the card's signature, so they hold at every
  // width — the card scales down on a phone rather than restructuring.
  const posterRight = orientation === "right";
  const posterPos = posterRight
    ? "order-last -ml-6 rotate-6 md:-ml-12"
    : "order-first -mr-6 -rotate-6 md:-mr-12";
  const panelPad = posterRight ? "pr-8 md:pr-16" : "pl-10 md:pl-24";

  return (
    <article className="group relative mx-auto flex w-full max-w-2xl flex-row items-center py-2 transition-transform duration-300 motion-safe:hover:scale-[1.01]">
      <Link
        href={`/events/${slug}`}
        aria-label={title}
        className={`relative z-10 block w-28 shrink-0 md:w-52 ${posterPos} transition-transform duration-300 motion-safe:group-hover:scale-105`}
      >
        <Image
          src={poster}
          alt=""
          width={420}
          height={560}
          className="h-auto w-full rounded-xl object-cover shadow-2xl"
        />
      </Link>
      <div
        className={`relative w-auto flex-1 rounded-2xl bg-olive p-4 text-cream shadow-lg transition md:p-8 motion-safe:group-hover:-translate-y-1 ${panelPad}`}
      >
        <h3 className="font-display text-xl font-semibold md:text-4xl">{title}</h3>
        <p className="mt-2 text-sm text-cream/80 md:text-lg">{date}</p>
        {venue ? <p className="text-sm text-cream/80 md:text-lg">{venue}</p> : null}
        <div className="mt-4 flex flex-wrap gap-2 md:mt-6 md:gap-4">
          {/* Stretched link: its ::after covers the whole panel, so clicking
              anywhere on the text opens the event page. Tickets is lifted above
              it (relative z-10) to stay independently clickable. */}
          <Link
            href={`/events/${slug}`}
            className="rounded-full bg-coral-soft px-4 py-3 text-sm font-medium text-ink transition after:absolute after:inset-0 after:rounded-2xl hover:bg-coral hover:text-cream md:px-7 md:text-base"
          >
            {discoverLabel}
          </Link>
          {upcoming && ticketsUrl ? (
            <a
              href={ticketsUrl}
              target="_blank"
              rel="noreferrer"
              className="relative z-10 rounded-full bg-coral px-4 py-3 text-sm font-medium text-cream transition hover:bg-coral-soft hover:text-ink md:px-7 md:text-base"
            >
              {ticketsLabel}
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
