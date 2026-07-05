import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import Slideshow from "@/ui/slideshow";

describe("Slideshow", () => {
  it("renders one image per entry", () => {
    const { container } = render(<Slideshow images={["/a.png", "/b.png", "/c.png"]} />);
    expect(container.querySelectorAll("img").length).toBe(3);
  });
});
