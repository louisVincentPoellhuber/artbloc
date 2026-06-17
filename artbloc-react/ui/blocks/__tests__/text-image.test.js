import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import TextImage from "@/ui/blocks/text-image";

describe("TextImage", () => {
  it("renders the text and an image", () => {
    const { container } = render(<TextImage text="Une histoire" image="/a.png" />);
    expect(screen.getByText("Une histoire")).toBeInTheDocument();
    expect(container.querySelector("img")).toBeTruthy();
  });

  it("renders for side=right as well", () => {
    const { container } = render(<TextImage text="Autre" image="/b.png" side="right" />);
    expect(screen.getByText("Autre")).toBeInTheDocument();
    expect(container.querySelector("img")).toBeTruthy();
  });
});
