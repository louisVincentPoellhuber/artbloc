import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import Gallery from "@/ui/blocks/gallery";

describe("Gallery", () => {
  it("renders one image per entry", () => {
    const { container } = render(<Gallery images={["/a.png", "/b.png", "/c.png"]} />);
    expect(container.querySelectorAll("img").length).toBe(3);
  });
});
