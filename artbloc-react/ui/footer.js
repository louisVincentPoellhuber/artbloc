import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getSite } from "@/lib/content";

const NAV = [
  { href: "/", key: "accueil" },
  { href: "/artists", key: "artistes" },
  { href: "/events", key: "evenements" },
  { href: "/about", key: "apropos" },
  { href: "/contact", key: "contact" },
];

// The nav catalog is uppercase for the pill bar; the footer wants sentence case.
// Locale-aware so "À PROPOS" becomes "À propos", not "À Propos" (which is what
// CSS `capitalize` would give).
function sentenceCase(value, locale) {
  const lower = value.toLocaleLowerCase(locale);
  return lower.charAt(0).toLocaleUpperCase(locale) + lower.slice(1);
}

export default async function Footer() {
  const locale = await getLocale();
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");
  const site = getSite(locale);

  return (
    <footer className="grid grid-cols-1 gap-8 bg-ink px-10 py-12 text-cream md:grid-cols-3">
      <div>
        <p className="mb-4 font-display text-lg font-semibold tracking-wide">{t("navigation")}</p>
        <ul className="space-y-2 text-sm text-cream/80">
          {NAV.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="inline-flex min-h-11 items-center transition-colors hover:text-cream">
                {sentenceCase(tNav(item.key), locale)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="mb-4 font-display text-lg font-semibold tracking-wide">{t("contact")}</p>
        <ul className="space-y-2 text-sm text-cream/80">
          <li>
            <a href={`mailto:${site.contact.email}`} className="inline-flex min-h-11 items-center transition-colors hover:text-cream">
              {t("email")}
            </a>
          </li>
          <li>
            <a href={site.contact.instagram} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center transition-colors hover:text-cream">
              {t("instagram")}
            </a>
          </li>
          <li>
            <a href={site.contact.facebook} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center transition-colors hover:text-cream">
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
