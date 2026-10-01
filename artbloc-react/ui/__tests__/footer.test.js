import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

const catalog = {
  nav: {
    accueil: "ACCUEIL",
    artistes: "ARTISTES",
    evenements: "ÉVÉNEMENTS",
    apropos: "À PROPOS",
    contact: "CONTACT",
  },
  footer: {
    navigation: "Navigation",
    contact: "Contact",
    adresse: "Adresse",
    email: "Courriel",
    instagram: "Instagram",
    facebook: "Facebook",
  },
};

vi.mock("next-intl/server", () => ({
  getLocale: async () => "fr",
  getTranslations: async (namespace) => (key) => catalog[namespace][key],
}));

const Footer = (await import("@/ui/footer")).default;

describe("Footer", () => {
  it("renders navigation labels from the nav catalog in sentence case", async () => {
    render(await Footer());
    expect(screen.getByText("Accueil")).toBeInTheDocument();
    expect(screen.getByText("Artistes")).toBeInTheDocument();
    expect(screen.getByText("Événements")).toBeInTheDocument();
    expect(screen.getByText("À propos")).toBeInTheDocument();
  });

  it("no longer renders the hardcoded English labels", async () => {
    render(await Footer());
    expect(screen.queryByText("Home")).not.toBeInTheDocument();
    expect(screen.queryByText("Artists")).not.toBeInTheDocument();
    expect(screen.queryByText("Events")).not.toBeInTheDocument();
    expect(screen.queryByText("About")).not.toBeInTheDocument();
  });
});
