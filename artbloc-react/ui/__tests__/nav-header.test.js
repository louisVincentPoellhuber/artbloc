import { describe, it, expect, vi } from "vitest";
import { act, render, screen, fireEvent, waitFor, within } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import NavHeader from "@/ui/nav-header";

const messages = {
  nav: {
    accueil: "ACCUEIL",
    artistes: "ARTISTES",
    evenements: "ÉVÉNEMENTS",
    apropos: "À PROPOS",
    contact: "CONTACT",
    toggle: "EN",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    menuLabel: "Menu principal",
  },
};

function renderNav() {
  return render(
    <NextIntlClientProvider locale="fr" messages={messages}>
      <NavHeader />
    </NextIntlClientProvider>
  );
}

describe("NavHeader mobile menu", () => {
  it("starts collapsed", () => {
    renderNav();
    const trigger = screen.getByRole("button", { name: "Ouvrir le menu" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("opens the panel with all five links and the locale toggle", () => {
    renderNav();
    fireEvent.click(screen.getByRole("button", { name: "Ouvrir le menu" }));

    const panel = screen.getByRole("dialog");
    expect(within(panel).getByText("ACCUEIL")).toBeInTheDocument();
    expect(within(panel).getByText("ARTISTES")).toBeInTheDocument();
    expect(within(panel).getByText("ÉVÉNEMENTS")).toBeInTheDocument();
    expect(within(panel).getByText("À PROPOS")).toBeInTheDocument();
    expect(within(panel).getByText("CONTACT")).toBeInTheDocument();
    expect(within(panel).getByRole("button", { name: "EN" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Fermer le menu" })).toHaveAttribute(
      "aria-expanded",
      "true"
    );
  });

  it("closes on Escape", () => {
    renderNav();
    fireEvent.click(screen.getByRole("button", { name: "Ouvrir le menu" }));
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("returns focus to the trigger when Escape closes the panel", () => {
    renderNav();
    const trigger = screen.getByRole("button", { name: "Ouvrir le menu" });
    fireEvent.click(trigger);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.getByRole("button", { name: "Ouvrir le menu" })).toHaveFocus();
  });

  it("closes when a link is selected", () => {
    renderNav();
    fireEvent.click(screen.getByRole("button", { name: "Ouvrir le menu" }));
    fireEvent.click(within(screen.getByRole("dialog")).getByText("ARTISTES"));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("locks body scroll while open and restores it on close", () => {
    renderNav();
    fireEvent.click(screen.getByRole("button", { name: "Ouvrir le menu" }));
    expect(document.body.style.overflow).toBe("hidden");
    fireEvent.keyDown(document, { key: "Escape" });
    expect(document.body.style.overflow).not.toBe("hidden");
  });

  it("keeps the exiting panel mounted but hidden from assistive tech, then removes it", async () => {
    const { container } = renderNav();
    fireEvent.click(screen.getByRole("button", { name: "Ouvrir le menu" }));
    fireEvent.keyDown(document, { key: "Escape" });

    // Still in the DOM so it can animate out, but already gone from the
    // accessibility tree — a panel on its way out is not a panel you can use.
    const panel = container.querySelector("#mobile-nav");
    expect(panel).toBeInTheDocument();
    expect(panel).toHaveAttribute("aria-hidden", "true");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await waitFor(() =>
      expect(container.querySelector("#mobile-nav")).not.toBeInTheDocument()
    );
  });

  it("staggers the links on entrance", async () => {
    renderNav();
    fireEvent.click(screen.getByRole("button", { name: "Ouvrir le menu" }));
    // The panel commits hidden first and flips on the next frame, so the
    // delays only land once that frame has run.
    await waitFor(() => {
      const links = within(screen.getByRole("dialog")).getAllByRole("link");
      const delays = links.map((link) => link.style.transitionDelay);
      expect(delays).toEqual(["80ms", "120ms", "160ms", "200ms", "240ms"]);
    });
  });

  it("drops the stagger and unmounts immediately under reduced motion", () => {
    const original = window.matchMedia;
    window.matchMedia = (query) => ({
      matches: query.includes("prefers-reduced-motion"),
      addEventListener: () => {},
      removeEventListener: () => {},
    });
    try {
      const { container } = renderNav();
      fireEvent.click(screen.getByRole("button", { name: "Ouvrir le menu" }));
      const links = within(screen.getByRole("dialog")).getAllByRole("link");
      links.forEach((link) => expect(link.style.transitionDelay).toBe("0ms"));

      fireEvent.keyDown(document, { key: "Escape" });
      expect(container.querySelector("#mobile-nav")).not.toBeInTheDocument();
    } finally {
      window.matchMedia = original;
    }
  });

  it("closes when the viewport widens past the desktop breakpoint", () => {
    // This path runs only in a real browser resize — no other test or the build
    // ever executes it, so without this it ships unverified.
    const original = window.matchMedia;
    const listeners = new Set();
    window.matchMedia = () => ({
      matches: false,
      addEventListener: (_type, cb) => listeners.add(cb),
      removeEventListener: (_type, cb) => listeners.delete(cb),
    });
    try {
      renderNav();
      fireEvent.click(screen.getByRole("button", { name: "Ouvrir le menu" }));
      expect(screen.getByRole("dialog")).toBeInTheDocument();

      // Still narrow: the panel stays put.
      act(() => listeners.forEach((cb) => cb({ matches: false })));
      expect(screen.getByRole("dialog")).toBeInTheDocument();

      // Crossed into desktop: the panel must go, or it strands the pill behind it.
      act(() => listeners.forEach((cb) => cb({ matches: true })));
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    } finally {
      window.matchMedia = original;
    }
  });

  it("wraps Tab from the last focusable element to the first, containing focus", () => {
    renderNav();
    fireEvent.click(screen.getByRole("button", { name: "Ouvrir le menu" }));
    const panel = screen.getByRole("dialog");
    const focusable = within(panel).getAllByRole("link").concat(within(panel).getAllByRole("button"));
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    last.focus();
    const event = new KeyboardEvent("keydown", { key: "Tab", bubbles: true, cancelable: true });
    const preventDefault = vi.spyOn(event, "preventDefault");
    panel.dispatchEvent(event);

    expect(preventDefault).toHaveBeenCalled();
    expect(first).toHaveFocus();
  });

  it("wraps Shift+Tab from the first focusable element to the last, containing focus", () => {
    renderNav();
    fireEvent.click(screen.getByRole("button", { name: "Ouvrir le menu" }));
    const panel = screen.getByRole("dialog");
    const focusable = within(panel).getAllByRole("link").concat(within(panel).getAllByRole("button"));
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    first.focus();
    const event = new KeyboardEvent("keydown", {
      key: "Tab",
      shiftKey: true,
      bubbles: true,
      cancelable: true,
    });
    const preventDefault = vi.spyOn(event, "preventDefault");
    panel.dispatchEvent(event);

    expect(preventDefault).toHaveBeenCalled();
    expect(last).toHaveFocus();
  });
});
