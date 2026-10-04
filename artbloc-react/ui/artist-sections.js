import { useTranslations } from "next-intl";
import Image from "next/image";

import PageTitle from "@/ui/page-title";
import MediumTags from "@/ui/medium-tags";
import Socials from "@/ui/socials";
import RoleBlock from "@/ui/role-block";
import InterviewEmbed from "@/ui/interview-embed";
import ArtistGallery from "@/ui/artist-gallery";
import ArtBloc2025 from "@/ui/art-bloc-2025";

// Presentational stack for a default artist page. Every section is conditional
// on its data; `team` (may be null) drives the role block.
export default function ArtistSections({ artist, team }) {
  const t = useTranslations("artist");
  return (
    <article className="flex flex-col gap-12 pb-24">
      <header>
        <PageTitle>{artist.name}</PageTitle>
        {artist.mediums.length > 0 ? <MediumTags tags={artist.mediums} /> : null}
        <Socials socials={artist.socials} />
      </header>

      {artist.headshot ? (
        <div className="px-6">
          <Image
            src={artist.headshot}
            alt={artist.name}
            width={160}
            height={160}
            className="h-40 w-40 rounded-full object-cover shadow-lg"
          />
        </div>
      ) : null}

      {artist.statement ? (
        <p className="mx-auto w-full max-w-3xl px-6 text-xl leading-relaxed text-ink/80">
          {artist.statement}
        </p>
      ) : null}

      {team ? (
        <RoleBlock heading={t("roleHeading")} role={team.role} description={team.roleDescription} />
      ) : null}

      {artist.interview?.youtubeId ? <InterviewEmbed youtubeId={artist.interview.youtubeId} /> : null}

      <ArtistGallery images={artist.images} />

      <ArtBloc2025 label={t("atArtBloc2025")} images={artist.artBloc2025} />
    </article>
  );
}
