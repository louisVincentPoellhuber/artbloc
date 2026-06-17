import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getSite } from "@/lib/content";

export default async function Footer() {
  const locale = await getLocale();
  const t = await getTranslations("footer");
  const site = getSite(locale);

  return (
    <footer className="grid grid-cols-1 gap-8 bg-ink px-10 py-12 text-cream md:grid-cols-3">
      <div>
        <p className="mb-4 font-display text-lg font-semibold tracking-wide">{t("navigation")}</p>
        <ul className="space-y-2 text-sm text-cream/80">
          <li><Link href="/" className="transition-colors hover:text-cream">Home</Link></li>
          <li><Link href="/artists" className="transition-colors hover:text-cream">Artists</Link></li>
          <li><Link href="/events" className="transition-colors hover:text-cream">Events</Link></li>
          <li><Link href="/about" className="transition-colors hover:text-cream">About</Link></li>
          <li><Link href="/contact" className="transition-colors hover:text-cream">Contact</Link></li>
        </ul>
      </div>
      <div>
        <p className="mb-4 font-display text-lg font-semibold tracking-wide">{t("contact")}</p>
        <ul className="space-y-2 text-sm text-cream/80">
          <li>
            <a href={`mailto:${site.contact.email}`} className="transition-colors hover:text-cream">
              {t("email")}
            </a>
          </li>
          <li>
            <a href={site.contact.instagram} target="_blank" rel="noreferrer" className="transition-colors hover:text-cream">
              {t("instagram")}
            </a>
          </li>
          <li>
            <a href={site.contact.facebook} target="_blank" rel="noreferrer" className="transition-colors hover:text-cream">
              {t("facebook")}
            </a>
          </li>
        </ul>
      </div>
      <div>
        <p className="mb-4 font-display text-lg font-semibold tracking-wide">{t("adresse")}</p>
        <p className="text-sm text-cream/80">{site.address}</p>
      </div>
    </footer>
  );
}
