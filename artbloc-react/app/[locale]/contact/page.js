import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { getSite } from "@/lib/content";
import PageTitle from "@/ui/page-title";
import ContactForm from "@/ui/contact-form";
import ActionCard from "@/ui/action-card";

export default async function ContactPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("contact");
  const site = getSite(locale);

  return (
    <div className="pb-24">
      <PageTitle>{t("title")}</PageTitle>
      <p className="mx-auto max-w-3xl px-6 pt-6 text-lg text-ink/80">{t("intro")}</p>

      <div className="mx-auto mt-12 grid max-w-5xl gap-10 px-6 md:grid-cols-2">
        <div className="flex flex-col gap-4 text-lg">
          <a href={`mailto:${site.contact.email}`} className="flex min-h-11 items-center gap-3 hover:text-coral">
            <Image src="/emailIcon.png" width={32} height={32} alt="" />
            {site.contact.email}
          </a>
          <a href={site.contact.instagram} target="_blank" rel="noreferrer" className="flex min-h-11 items-center gap-3 hover:text-coral">
            <Image src="/instagramIcon.png" width={32} height={32} alt="" />
            @artblocstudio
          </a>
          <a href={site.contact.facebook} target="_blank" rel="noreferrer" className="flex min-h-11 items-center gap-3 hover:text-coral">
            <Image src="/facebookIcon.png" width={32} height={32} alt="" />
            ART BLOC Studio
          </a>
          <a href={site.contact.youtube} target="_blank" rel="noreferrer" className="flex min-h-11 items-center gap-3 hover:text-coral">
            {/* Inline so the mark matches the 32px PNG icons above without adding an asset. */}
            <svg width="32" height="32" viewBox="0 0 24 24" aria-hidden="true" className="shrink-0">
              <path
                fill="#FF0000"
                d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8z"
              />
              <path fill="#fff" d="M9.6 15.6V8.4l6.2 3.6-6.2 3.6z" />
            </svg>
            @artblocstudio
          </a>
        </div>
        <ContactForm />
      </div>

      <section className="mt-20 px-6">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          <ActionCard
            title={t("action1Title")}
            body={t("action1Body")}
            href={site.involvement.artists}
          />
          <ActionCard
            title={t("action2Title")}
            body={t("action2Body")}
            href={site.involvement.newsletter}
          />
          <ActionCard
            title={t("action3Title")}
            body={t("action3Body")}
            href={site.involvement.donate}
          />
        </div>
      </section>
    </div>
  );
}
