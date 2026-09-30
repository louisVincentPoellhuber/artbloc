import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { getAllArtistSlugs, getTeam } from "@/lib/content";
import { Link } from "@/i18n/navigation";
import PageTitle from "@/ui/page-title";
import RichText from "@/ui/blocks/rich-text";
import ColoredSection from "@/ui/blocks/colored-section";
import PersonCard from "@/ui/person-card";

const groupColor = { exec: "coral", satellite: "teal" };

export default async function AboutPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("about");
  const team = getTeam(locale);
  const exec = team.filter((m) => m.group === "exec");
  const satellites = team.filter((m) => m.group === "satellite");
  // Many of the team are also exhibiting artists. Where a spotlight page exists
  // the card links to it; where it doesn't, the card is simply static.
  const artistSlugs = new Set(getAllArtistSlugs());

  const grid = (members) => (
    <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 px-6 sm:grid-cols-3 lg:grid-cols-4">
      {members.map((m) => {
        const card = (
          <PersonCard
            image={m.photo}
            hoverImage={m.hoverImage}
            primary={m.name}
            secondary={m.role}
            color={groupColor[m.group]}
          />
        );
        return artistSlugs.has(m.slug) ? (
          <Link key={m.slug} href={`/artists/${m.slug}`} className="block h-full">
            {card}
          </Link>
        ) : (
          <div key={m.slug}>{card}</div>
        );
      })}
    </div>
  );

  return (
    <div className="pb-24">
      <PageTitle>{t("missionTitle")}</PageTitle>
      <div className="flex flex-col gap-6 pt-8">
        <RichText text={t("missionLead")} variant="lead" />
        <RichText text={t("missionBody")} />
      </div>

      <div className="mt-16 w-full">
        <Image
          src="/ABBannerTemp.jpg"
          alt=""
          width={1600}
          height={800}
          className="h-auto w-full object-cover"
        />
      </div>

      <div className="mt-16">
        <ColoredSection color="teal" heading={t("historyTitle")} text={t("historyBody")} />
      </div>

      <section className="mt-20">
        <h2 className="px-6 font-display text-4xl font-semibold text-ink md:text-5xl">
          {t("meetTitle")} <span className="text-coral">▪</span>
        </h2>
        <h3 className="mt-10 mb-6 text-center font-display text-2xl text-ink/80">{t("execTitle")}</h3>
        {grid(exec)}
        <h3 className="mt-12 mb-6 text-center font-display text-2xl text-ink/80">
          {t("satellitesTitle")}
        </h3>
        {grid(satellites)}
      </section>
    </div>
  );
}
