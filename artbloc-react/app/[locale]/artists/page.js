import { setRequestLocale } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { getAllArtists, getArtistColor } from "@/lib/content";
import PageTitle from "@/ui/page-title";
import PersonCard from "@/ui/person-card";

export default async function ArtistsPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const artists = getAllArtists(locale);

  return (
    <div className="pb-24">
      <PageTitle>Nos artistes</PageTitle>
      <div className="grid grid-cols-4 gap-6 px-6 pt-12">
        {artists.map((artist) => (
          <Link key={artist.slug} href={`/artists/${artist.slug}`}>
            <PersonCard
              image={artist.avatar}
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
