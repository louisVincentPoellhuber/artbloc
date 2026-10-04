import { getTranslations, setRequestLocale } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { getAllArtists, getArtistColor } from "@/lib/content";
import PageTitle from "@/ui/page-title";
import PersonCard from "@/ui/person-card";

export default async function ArtistsPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("artists");

  const artists = getAllArtists(locale);

  return (
    <div className="pb-24">
      <PageTitle>{t("title")}</PageTitle>
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-5 px-6 pt-12 sm:grid-cols-3 lg:grid-cols-4">
        {artists.map((artist) => (
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
    </div>
  );
}
