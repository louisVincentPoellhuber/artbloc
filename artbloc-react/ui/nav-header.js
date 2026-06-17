"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";

const LINKS = [
  { href: "/", key: "accueil", accent: "bg-coral" },
  { href: "/artists", key: "artistes", accent: "bg-coral" },
  { href: "/events", key: "evenements", accent: "bg-olive" },
  { href: "/about", key: "apropos", accent: "bg-teal" },
  { href: "/contact", key: "contact", accent: "bg-coral-soft" },
];

function isActive(pathname, href) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function NavHeader() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const otherLocale = locale === "fr" ? "en" : "fr";

  return (
    <header className="absolute top-0 right-0 z-20 m-4 flex h-16 items-center gap-1 rounded-full bg-white/95 px-3 shadow-sm backdrop-blur">
      <Image src="/ABNavLogo.png" width={40} height={40} alt="Art Bloc" className="mr-1" />
      <nav className="flex items-center gap-1">
        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`rounded-full px-3 py-1.5 font-display text-sm font-medium tracking-wide transition-colors ${
              isActive(pathname, link.href)
                ? `${link.accent} text-white`
                : "text-ink/70 hover:text-ink"
            }`}
          >
            {t(link.key)}
          </Link>
        ))}
      </nav>
      <button
        type="button"
        onClick={() => router.replace(pathname, { locale: otherLocale })}
        className="ml-1 rounded-full border border-ink/20 px-3 py-1.5 font-display text-sm font-medium text-ink/70 transition-colors hover:bg-ink hover:text-cream"
      >
        {t("toggle")}
      </button>
    </header>
  );
}
