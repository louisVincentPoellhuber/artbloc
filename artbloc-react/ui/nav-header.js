"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
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

// Exit is shorter than entrance: arriving can be leisurely, dismissing should not be.
const EXIT_MS = 150;
const STAGGER_MS = 40;
const STAGGER_OFFSET_MS = 80;

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(onChange) {
  const mq = window.matchMedia?.(REDUCED_MOTION);
  if (!mq) return () => {};
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

// Subscribed rather than read once, so flipping the OS setting takes effect
// immediately instead of at the next full page load.
function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    () => window.matchMedia?.(REDUCED_MOTION).matches ?? false,
    () => false
  );
}

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
  // `mounted` trails `menuOpen` on close so the panel survives its exit
  // transition; `shown` drives the classes that actually animate.
  const [mounted, setMounted] = useState(false);
  const [shown, setShown] = useState(false);
  const reduceMotion = usePrefersReducedMotion();
  const scrollHidden = useHideOnScroll();
  const hidden = headerHidden({ hidden: scrollHidden, menuOpen });
  const triggerRef = useRef(null);
  const panelRef = useRef(null);

  // A route change means the user navigated away — the panel must not survive it.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Drive mount/unmount around the transition. Under reduced motion there is no
  // transition to wait for, so both edges are immediate.
  useEffect(() => {
    if (menuOpen) {
      // The extra commit is the mechanism here, not an accident: the panel has
      // to render once in its hidden state before `shown` flips, or the browser
      // has no "from" value to animate out of.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMounted(true);
      if (reduceMotion) {
        setShown(true);
        return;
      }
      // Two frames, deliberately: one rAF still lands in the same paint as the
      // mount, so the browser coalesces hidden→shown and no transition runs.
      // The first frame lets the hidden state paint; the second flips it.
      let inner;
      const outer = requestAnimationFrame(() => {
        inner = requestAnimationFrame(() => setShown(true));
      });
      return () => {
        cancelAnimationFrame(outer);
        if (inner) cancelAnimationFrame(inner);
      };
    }
    setShown(false);
    if (reduceMotion) {
      setMounted(false);
      return;
    }
    const timer = setTimeout(() => setMounted(false), EXIT_MS);
    return () => clearTimeout(timer);
  }, [menuOpen, reduceMotion]);

  // Escape and the body-scroll lock belong to the open state and release the
  // moment it closes — the exiting panel is inert and must not hold them.
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  // Focus waits for the panel to exist — it mounts a commit after the open.
  useEffect(() => {
    if (menuOpen && mounted) panelRef.current?.focus();
  }, [menuOpen, mounted]);

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

  // aria-modal="true" claims focus is contained — Tab must not be able to
  // escape into the page behind the overlay.
  function handlePanelKeyDown(event) {
    if (event.key !== "Tab") return;
    const focusable = panelRef.current?.querySelectorAll("a[href], button:not([disabled])");
    if (!focusable || focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  // Entrance cascades down the list; exit drops every delay so the panel leaves
  // as one piece.
  function itemDelay(index) {
    if (!shown || reduceMotion) return "0ms";
    return `${STAGGER_OFFSET_MS + index * STAGGER_MS}ms`;
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
          className="ml-1 flex h-11 w-11 items-center justify-center rounded-full font-display text-2xl leading-none text-ink md:hidden"
        >
          {menuOpen ? "✕" : "≡"}
        </button>
      </header>

      {mounted ? (
        <div
          id="mobile-nav"
          ref={panelRef}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-label={t("menuLabel")}
          aria-hidden={!menuOpen}
          onKeyDown={handlePanelKeyDown}
          className={`fixed inset-0 z-20 flex flex-col justify-center-safe overflow-y-auto bg-cream px-8 py-24 transition-[opacity,translate] ease-out md:hidden ${
            shown
              ? "translate-y-0 opacity-100 duration-200"
              : "pointer-events-none -translate-y-2 opacity-0 duration-150"
          }`}
        >
          <nav className="flex flex-col items-start gap-2">
            {LINKS.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                style={{ transitionDelay: itemDelay(index) }}
                className={`rounded-full px-5 py-2 font-display text-4xl font-medium transition-[opacity,translate,color] duration-200 ease-out ${
                  isActive(pathname, link.href) ? `${link.accent} text-cream` : "text-ink"
                } ${shown ? "translate-y-0 opacity-100" : "translate-y-1.5 opacity-0"}`}
              >
                {t(link.key)}
              </Link>
            ))}
          </nav>
          <div
            style={{ transitionDelay: itemDelay(LINKS.length) }}
            className={`mt-10 border-t border-ink/15 pt-6 transition-[opacity,translate] duration-200 ease-out ${
              shown ? "translate-y-0 opacity-100" : "translate-y-1.5 opacity-0"
            }`}
          >
            <button
              type="button"
              onClick={() => {
                switchLocale();
                closeMenu();
              }}
              className="flex min-h-11 min-w-11 items-center font-display text-2xl font-medium text-ink/70"
            >
              {t("toggle")}
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
