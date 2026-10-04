import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import ArtistSections from "@/ui/artist-sections";

const messages = {
  artist: {
    interviewTitle: "Entrevue",
    atArtBloc2025: "À Art Bloc 2025",
    roleHeading: "À Art Bloc",
  },
};

function renderSections(artist, team = null) {
  return render(
    <NextIntlClientProvider locale="fr" messages={messages}>
      <ArtistSections artist={artist} team={team} />
    </NextIntlClientProvider>
  );
}

const base = { slug: "x", name: "X", mediums: ["Peintre"], images: [], artBloc2025: [] };

describe("ArtistSections", () => {
  it("shows the statement when present", () => {
    renderSections({ ...base, statement: "Ma démarche." });
    expect(screen.getByText("Ma démarche.")).toBeInTheDocument();
  });

  it("omits the interview when there is no id", () => {
    const { container } = renderSections({ ...base });
    expect(container.querySelector("iframe")).toBeNull();
  });

  it("renders the role block only when a team record is given", () => {
    renderSections(base, { role: "Curation", roleDescription: "Fait la curation." });
    expect(screen.getByText("Fait la curation.")).toBeInTheDocument();
  });
});
