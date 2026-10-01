import { getFormatter, getTranslations, setRequestLocale } from "next-intl/server";

import { getEventsByStatus } from "@/lib/content";
import PageTitle from "@/ui/page-title";
import EventCard from "@/ui/event-card";

export default async function EventsPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("events");
  const format = await getFormatter();
  const fmt = (iso) => format.dateTime(new Date(iso), { year: "numeric", month: "long" });

  const upcoming = getEventsByStatus("upcoming", locale);
  const past = getEventsByStatus("past", locale);

  const card = (event, status) => (
    <EventCard
      key={event.slug}
      slug={event.slug}
      title={event.title}
      date={fmt(event.date)}
      venue={event.venue ?? ""}
      poster={event.poster}
      status={status}
      orientation={event.orientation}
      ticketsUrl={event.eventbriteUrl}
      discoverLabel={t("discover")}
      ticketsLabel={t("tickets")}
    />
  );

  return (
    <div className="pb-24">
      <PageTitle>{t("title")}</PageTitle>
      <section className="mx-auto max-w-5xl px-6 pt-12">
        <h2 className="mb-6 font-display text-3xl text-ink/80">{t("upcoming")}</h2>
        <div className="flex flex-col gap-8">{upcoming.map((e) => card(e, "upcoming"))}</div>
      </section>
      <section className="mx-auto max-w-5xl px-6 pt-16">
        <h2 className="mb-6 font-display text-3xl text-ink/80">{t("past")}</h2>
        <div className="flex flex-col gap-8">{past.map((e) => card(e, "past"))}</div>
      </section>
    </div>
  );
}
