import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

const catalog = {
  about: {
    missionTitle: "Mission",
    missionLead: "Lead",
    missionBody: "Body",
    historyTitle: "Notre histoire",
    historyBody: "Histoire",
    meetTitle: "Rencontrez-nous",
    execTitle: "Conseil exécutif",
    satellitesTitle: "Satellites",
  },
};

vi.mock("next-intl/server", () => ({
  setRequestLocale: () => {},
  getLocale: async () => "fr",
  getTranslations: async (namespace) => (key) => catalog[namespace][key],
}));

// Controlled roster: one member who has an artist page, one who does not, so
// the test pins the rule rather than whatever content happens to exist today.
vi.mock("@/lib/content", () => ({
  getTeam: () => [
    {
      slug: "jenny-meng",
      name: "Jenny Meng",
      role: "Coordonnatrice artistique",
      photo: "/a.png",
      group: "exec",
    },
    {
      slug: "sans-page",
      name: "Sans Page",
      role: "Bénévole",
      photo: "/b.png",
      group: "satellite",
    },
  ],
  getAllArtistSlugs: () => ["jenny-meng"],
}));

const AboutPage = (await import("@/app/[locale]/about/page")).default;

function renderAbout() {
  return render(AboutPage({ params: Promise.resolve({ locale: "fr" }) }));
}

describe("About team grid", () => {
  it("links a member who has an artist page to it", async () => {
    render(await AboutPage({ params: Promise.resolve({ locale: "fr" }) }));
    const link = screen.getByText("Jenny Meng").closest("a");
    expect(link).not.toBeNull();
    expect(link).toHaveAttribute("href", "/artists/jenny-meng");
  });

  it("leaves a member with no artist page unlinked", async () => {
    render(await AboutPage({ params: Promise.resolve({ locale: "fr" }) }));
    expect(screen.getByText("Sans Page").closest("a")).toBeNull();
  });
});
