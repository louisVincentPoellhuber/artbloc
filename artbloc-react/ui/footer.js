import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getSite } from "@/lib/content";

export default async function Footer() {
  const locale = await getLocale();
  const t = await getTranslations("footer");
  const site = getSite(locale);

  return (
    <footer className="grid grid-cols-1 gap-6 bg-ink px-10 py-8 text-cream md:grid-cols-3">
      <div>
        <p className="mb-3 text-xl">{t("navigation")}</p>
        <ul className="space-y-1 text-base">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/artists">Artists</Link></li>
          <li><Link href="/events">Events</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
      </div>
      <div>
        <p className="mb-3 text-xl">{t("contact")}</p>
        <ul className="space-y-1 text-base">
          <li><a href={`mailto:${site.contact.email}`}>{t("email")}</a></li>
          <li><a href={site.contact.instagram} target="_blank" rel="noreferrer">{t("instagram")}</a></li>
          <li><a href={site.contact.facebook} target="_blank" rel="noreferrer">{t("facebook")}</a></li>
        </ul>
      </div>
      <div>
        <p className="mb-3 text-xl">{t("adresse")}</p>
        <p className="text-base">{site.address}</p>
      </div>
    </footer>
  );
}
