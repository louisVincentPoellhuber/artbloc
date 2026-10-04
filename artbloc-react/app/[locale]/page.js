import { getFormatter, getTranslations, setRequestLocale } from "next-intl/server";

import { getSite, getEventsByStatus, getAllArtists, getArtistColor } from "@/lib/content";
import { Link } from "@/i18n/navigation";
import HomeHero from "@/ui/home-hero";
import Image from "next/image";
import TexturedBackground from "@/ui/textured-background";
import SectionLink from "@/ui/section-link";
import Carousel from "@/ui/carousel";
import PersonCard from "@/ui/person-card";
import ActionCard from "@/ui/action-card";

export default async function HomePage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("home");
  const tc = await getTranslations("contact");
  const te = await getTranslations("events");
  const format = await getFormatter();

  const site = getSite(locale);
  const edition = getEventsByStatus("upcoming", locale)[0];
  const editionArtists = edition
    ? getAllArtists(locale).filter((a) => edition.artists.includes(a.slug))
    : [];

  return (
    <div>
      <HomeHero images={site.slideshow} tagline={t("tagline")} />

      <section className="flex items-center justify-center bg-cream px-6 py-24 md:min-h-screen">
        <p className="mx-auto max-w-4xl text-center font-display text-4xl leading-tight text-ink md:text-6xl">
          {t("description")}
        </p>
      </section>

      {edition ? (
        <section className="relative flex items-center overflow-hidden bg-olive px-6 py-24 text-cream md:min-h-screen">
          <TexturedBackground variant="olive" />
          <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-10 md:flex-row md:items-center">
            <div className="md:w-1/2">
              <h2 className="font-display text-5xl font-semibold md:text-6xl">
                {t("editionPrefix")} {new Date(edition.date).getFullYear()}{" "}
                <span className="align-middle">▪</span>
              </h2>
              <p className="mt-6 text-2xl">
                {format.dateTime(new Date(edition.date), { year: "numeric", month: "long" })}
              </p>
              {edition.venue ? <p className="text-2xl">{edition.venue}</p> : null}
              {edition.price ? <p className="text-2xl">{edition.price}</p> : null}
              {edition.eventbriteUrl ? (
                <a
                  href={edition.eventbriteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-block rounded-full bg-cream px-8 py-3 font-medium text-ink transition hover:bg-white"
                >
                  {te("tickets")}
                </a>
              ) : null}
            </div>
            {edition.poster ? (
              <div className="md:w-1/2">
                {/* Tilted like the EventCard poster, leaning away from the text. */}
                <Link
                  href={`/events/${edition.slug}`}
                  className="group/poster mx-auto block w-56 rotate-6 transition-transform duration-300 sm:w-64 md:w-80 motion-safe:hover:scale-105"
                >
                  <Image
                    src={edition.poster}
                    alt={edition.title}
                    width={420}
                    height={560}
                    className="h-auto w-full rounded-xl object-cover shadow-2xl"
                  />
                </Link>
              </div>
            ) : null}
          </div>
          <div className="absolute bottom-8 right-6 z-10 md:bottom-12 md:right-12">
            <SectionLink href="/events" label={t("seeEvents")} />
          </div>
        </section>
      ) : null}

      {editionArtists.length > 0 ? (
        <section className="relative flex flex-col justify-center overflow-hidden bg-coral px-6 py-24 text-cream md:min-h-screen">
          <TexturedBackground variant="coral" />
          <div className="relative z-10 mx-auto w-full max-w-6xl">
            <h2 className="font-display text-5xl font-semibold md:text-6xl">
              {t("artistsTitle")} <span className="align-middle">▪</span>
            </h2>
            <div className="mt-10">
              <Carousel>
              {editionArtists.map((a) => (
                <div key={a.slug} className="w-64 shrink-0 snap-start">
                  <Link href={`/artists/${a.slug}`}>
                    <PersonCard
                      image={a.avatar}
                      hoverImage={a.hoverImage}
                      primary={a.name}
                      secondary={a.mediums[0] ?? ""}
                      color={getArtistColor(a.slug)}
                    />
                  </Link>
                </div>
              ))}
              </Carousel>
            </div>
          </div>
          <div className="absolute bottom-8 right-6 z-10 md:bottom-12 md:right-12">
            <SectionLink href="/artists" label={t("seeArtists")} />
          </div>
        </section>
      ) : null}

      <section className="flex flex-col justify-center bg-cream px-6 py-16 md:min-h-screen">
        <h2 className="mb-12 text-center font-display text-5xl font-semibold text-ink md:text-6xl">
          {t("involvementTitle")} <span className="text-coral">!</span>
        </h2>
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          <ActionCard
            title={tc("action1Title")}
            body={tc("action1Body")}
            href={site.involvement.artists}
          />
          <ActionCard
            title={tc("action2Title")}
            body={tc("action2Body")}
            href={site.involvement.newsletter}
          />
          <ActionCard
            title={tc("action3Title")}
            body={tc("action3Body")}
            href={site.involvement.donate}
          />
        </div>
      </section>
    </div>
  );
}
