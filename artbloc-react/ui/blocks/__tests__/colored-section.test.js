import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ColoredSection from "@/ui/blocks/colored-section";

describe("ColoredSection", () => {
  it("renders heading and text", () => {
    render(<ColoredSection color="teal" heading="Notre histoire" text="Né en 2024" />);
    expect(screen.getByText("Notre histoire")).toBeInTheDocument();
    expect(screen.getByText("Né en 2024")).toBeInTheDocument();
  });

  it("applies the color background class", () => {
    const { container } = render(<ColoredSection color="teal" text="x" />);
    expect(container.querySelector("section").className).toContain("bg-teal");
  });
});
