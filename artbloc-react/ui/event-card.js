import Image from "next/image";
import { Link } from "@/i18n/navigation";

export default function EventCard({
  slug,
  title,
  date,
  venue,
  poster,
  status,
  ticketsUrl,
  discoverLabel,
  ticketsLabel,
}) {
  const upcoming = status === "upcoming";
  const posterSide = upcoming ? "md:order-last md:-rotate-6" : "md:order-first md:rotate-6";
  return (
    <article className="flex flex-col gap-4 overflow-hidden rounded-2xl bg-olive p-6 text-cream transition hover:shadow-xl motion-safe:hover:-translate-y-1 md:flex-row md:items-center md:gap-8">
      <div className={`w-40 shrink-0 ${posterSide}`}>
        <Image
          src={poster}
          alt=""
          width={300}
          height={400}
          className="h-auto w-full rounded-xl object-cover shadow-lg"
        />
      </div>
      <div className="flex-1">
        <h3 className="font-display text-3xl font-semibold md:text-4xl">{title}</h3>
        <p className="mt-1 text-cream/80">{date}</p>
        {venue ? <p className="text-cream/80">{venue}</p> : null}
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href={`/events/${slug}`}
            className="rounded-full bg-cream px-4 py-2 text-sm font-medium text-ink transition hover:bg-white"
          >
            {discoverLabel}
          </Link>
          {upcoming && ticketsUrl ? (
            <a
              href={ticketsUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-coral px-4 py-2 text-sm font-medium text-cream transition hover:bg-coral-soft"
            >
              {ticketsLabel}
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
