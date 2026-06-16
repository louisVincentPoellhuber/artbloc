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
});
