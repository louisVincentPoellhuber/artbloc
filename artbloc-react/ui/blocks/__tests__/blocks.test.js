import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import Blocks from "@/ui/blocks/blocks";

const messages = {
  video: { title: "Vidéo Art Bloc" },
  carousel: { label: "Carrousel", previous: "Précédent", next: "Suivant" },
};

describe("Blocks renderer", () => {
  it("renders each known block by type", () => {
    render(
      <NextIntlClientProvider locale="fr" messages={messages}>
        <Blocks
          blocks={[
            { type: "richText", text: "Premier" },
            { type: "videoEmbed", id: "xyz" },
          ]}
        />
      </NextIntlClientProvider>
    );
    expect(screen.getByText("Premier")).toBeInTheDocument();
  });

  it("throws on an unknown block type", () => {
    expect(() => render(<Blocks blocks={[{ type: "mystery" }]} />)).toThrow(
      /Unknown block type: "mystery"/
    );
  });

  it("renders the new block types by registry key", () => {
    render(
      <Blocks
        blocks={[
          { type: "quote", text: "Citation" },
          { type: "coloredSection", color: "coral", text: "Bande" },
        ]}
      />
    );
    expect(screen.getByText("Citation")).toBeInTheDocument();
    expect(screen.getByText("Bande")).toBeInTheDocument();
  });

  it("renders a carousel block with one image per entry", () => {
    const { container } = render(
      <NextIntlClientProvider locale="fr" messages={messages}>
        <Blocks blocks={[{ type: "carousel", images: [{ src: "/a.png" }, { src: "/b.png" }] }]} />
      </NextIntlClientProvider>
    );
    expect(container.querySelectorAll("img").length).toBe(2);
  });
});
