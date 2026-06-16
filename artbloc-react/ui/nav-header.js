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
    <header className="absolute top-0 right-0 z-10 m-4 flex h-16 items-center gap-2 rounded-full bg-white px-3">
      <Image src="/ABNavLogo.png" width={40} height={40} alt="Art Bloc" />
      <nav className="flex items-center gap-2">
        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`rounded-full px-3 py-1 text-sm ${
              isActive(pathname, link.href) ? `${link.accent} text-white` : ""
            }`}
          >
            {t(link.key)}
          </Link>
        ))}
      </nav>
      <button
        type="button"
        onClick={() => router.replace(pathname, { locale: otherLocale })}
        className="rounded-full border border-ink/30 px-3 py-1 text-sm"
      >
        {t("toggle")}
      </button>
    </header>
  );
}
