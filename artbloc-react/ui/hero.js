import Image from "next/image";

export default function Hero({ poster, title, date, venue, upcoming, ticketsUrl, ticketsLabel }) {
  return (
    <header className="relative flex min-h-[60vh] w-full items-center justify-center overflow-hidden">
      <Image src={poster} alt="" fill sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/40 to-ink/50" />
      <div className="relative z-10 mx-6 max-w-2xl rounded-2xl bg-ink/30 px-8 py-10 text-center text-cream backdrop-blur-md">
        <h1 className="font-display text-5xl font-semibold md:text-7xl">{title}</h1>
        <p className="mt-3 text-lg text-cream/90">
          {date}
          {venue ? ` · ${venue}` : ""}
        </p>
        {upcoming && ticketsUrl ? (
          <a
            href={ticketsUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-block rounded-full bg-coral px-6 py-3 font-medium text-cream transition hover:bg-coral-soft"
          >
            {ticketsLabel}
          </a>
        ) : null}
      </div>
    </header>
  );
}
