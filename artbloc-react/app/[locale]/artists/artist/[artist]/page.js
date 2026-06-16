import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { routing } from "@/i18n/routing";
import { getAllArtistSlugs, getArtist } from "@/lib/content";
import PageTitle from "@/ui/page-title";
import MediumTags from "@/ui/medium-tags";
import Blocks from "@/ui/blocks/blocks";

export function generateStaticParams() {
  const slugs = getAllArtistSlugs();
  return routing.locales.flatMap((locale) =>
    slugs.map((artist) => ({ locale, artist }))
  );
}

export default async function ArtistPage({ params }) {
  const { locale, artist: slug } = await params;
  setRequestLocale(locale);

  const artist = getArtist(slug, locale);
  if (!artist) {
    notFound();
  }

  return (
    <article className="flex flex-col gap-12 pb-24">
      <header>
        <PageTitle>{artist.name}</PageTitle>
        <MediumTags tags={artist.mediums} />
      </header>
      <Blocks blocks={artist.blocks} />
    </article>
  );
}
