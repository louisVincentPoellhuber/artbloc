import { getTranslations, setRequestLocale } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { getArtistsByYear, getArtistColor } from "@/lib/content";
import PageTitle from "@/ui/page-title";
import PersonCard from "@/ui/person-card";

export default async function ArtistsPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("artists");

  // Grouped by the edition they showed in; staff who have never exhibited are
  // absent, because they appear in no event roster.
  const groups = getArtistsByYear(locale);

  return (
    <div className="pb-24">
      <PageTitle>{t("title")}</PageTitle>
      {groups.map((group) => (
        <section key={group.year} className="pt-12">
          <h2 className="mx-auto max-w-7xl px-6 font-display text-4xl font-semibold text-ink md:text-5xl">
            {group.year} <span className="align-middle text-coral">▪</span>
          </h2>
          <div className="mx-auto mt-6 grid max-w-7xl grid-cols-2 gap-5 px-6 sm:grid-cols-3 lg:grid-cols-4">
            {group.artists.map((artist) => (
              <Link key={artist.slug} href={`/artists/${artist.slug}`} className="block h-full">
                <PersonCard
                  image={artist.avatar}
                  hoverImage={artist.hoverImage}
                  images={artist.images}
                  primary={artist.name}
                  secondary={artist.mediums[0] ?? ""}
                  color={getArtistColor(artist.slug)}
                />
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
