import { getFormatter, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { routing } from "@/i18n/routing";
import { getAllEventSlugs, getEvent, getEventArtists } from "@/lib/content";
import { eventStatus } from "@/lib/events";
import Hero from "@/ui/hero";
import ArtistAvatar from "@/ui/artist-avatar";
import Blocks from "@/ui/blocks/blocks";

export function generateStaticParams() {
  const slugs = getAllEventSlugs();
  return routing.locales.flatMap((locale) =>
    slugs.map((event) => ({ locale, event }))
  );
}

export default async function EventPage({ params }) {
  const { locale, event: slug } = await params;
  setRequestLocale(locale);

  const event = getEvent(slug, locale);
  if (!event) {
    notFound();
  }

  const t = await getTranslations("events");
  const format = await getFormatter();
  const upcoming = eventStatus(event) === "upcoming";
  const artists = getEventArtists(event, locale);

  return (
    <article className="flex flex-col gap-16 pb-24">
      <Hero
        poster={event.poster}
        title={event.title}
        date={format.dateTime(new Date(event.date), {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
        venue={event.venue}
        upcoming={upcoming}
        ticketsUrl={event.eventbriteUrl}
        ticketsLabel={t("tickets")}
      />
      {artists.length > 0 ? (
        <div className="mx-auto flex max-w-5xl flex-wrap justify-center gap-8 px-6">
          {artists.map((a) => (
            <ArtistAvatar key={a.slug} slug={a.slug} name={a.name} avatar={a.avatar} />
          ))}
        </div>
      ) : null}
      <Blocks blocks={event.blocks} />
    </article>
  );
}
