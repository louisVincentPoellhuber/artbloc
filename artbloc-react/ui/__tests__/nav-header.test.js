import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
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
