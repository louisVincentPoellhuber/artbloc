import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Blocks from "@/ui/blocks/blocks";

describe("Blocks renderer", () => {
  it("renders each known block by type", () => {
    render(
      <Blocks
        blocks={[
          { type: "richText", text: "Premier" },
          { type: "videoEmbed", id: "xyz" },
        ]}
      />
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
      <Blocks blocks={[{ type: "carousel", images: ["/a.png", "/b.png"] }]} />
    );
    expect(container.querySelectorAll("img").length).toBe(2);
  });
});
