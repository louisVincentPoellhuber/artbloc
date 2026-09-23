"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { headerHidden, useHideOnScroll } from "@/lib/use-hide-on-scroll";

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
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollHidden = useHideOnScroll();
  const hidden = headerHidden({ hidden: scrollHidden, menuOpen });
  const triggerRef = useRef(null);
  const panelRef = useRef(null);

  // A route change means the user navigated away — the panel must not survive it.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Escape, body-scroll lock and initial focus all belong to the open state.
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  // Resizing up to desktop must not leave the pill stranded behind a dead overlay.
  useEffect(() => {
    if (!menuOpen) return;
    const mq = window.matchMedia?.("(min-width: 768px)");
    if (!mq) return;
    const onChange = (event) => {
      if (event.matches) setMenuOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
    triggerRef.current?.focus();
  }

  function switchLocale() {
    router.replace(pathname, { locale: otherLocale });
  }

  return (
    <>
      <header
        className={`fixed top-0 right-0 z-30 m-4 flex h-16 items-center gap-1 rounded-full bg-white/70 px-3 shadow-sm backdrop-blur-md transition duration-300 ${
          hidden ? "-translate-y-[150%] opacity-0" : "translate-y-0 opacity-100"
        }`}
      >
        <Image src="/ABNavLogo.png" width={40} height={40} alt="Art Bloc" className="mr-1" />
        <nav className="hidden items-center gap-1 md:flex">
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
          onClick={switchLocale}
          className="ml-1 hidden rounded-full border border-ink/20 px-3 py-1.5 font-display text-sm font-medium text-ink/70 transition-colors hover:bg-ink hover:text-cream md:inline-block"
        >
          {t("toggle")}
        </button>
        <button
          ref={triggerRef}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? t("closeMenu") : t("openMenu")}
          onClick={() => (menuOpen ? closeMenu() : setMenuOpen(true))}
          className="ml-1 rounded-full px-3 py-1.5 font-display text-2xl leading-none text-ink md:hidden"
        >
          {menuOpen ? "✕" : "≡"}
        </button>
      </header>

      {menuOpen ? (
        <div
          id="mobile-nav"
          ref={panelRef}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-label={t("menuLabel")}
          className="fixed inset-0 z-20 flex flex-col justify-center bg-cream px-8 md:hidden"
        >
          <nav className="flex flex-col items-start gap-2">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={`rounded-full px-5 py-2 font-display text-4xl font-medium transition-colors ${
                  isActive(pathname, link.href) ? `${link.accent} text-cream` : "text-ink"
                }`}
              >
                {t(link.key)}
              </Link>
            ))}
          </nav>
          <div className="mt-10 border-t border-ink/15 pt-6">
            <button
              type="button"
              onClick={() => {
                switchLocale();
                closeMenu();
              }}
              className="font-display text-2xl font-medium text-ink/70"
            >
              {t("toggle")}
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
