import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import TexturedBackground from "@/ui/textured-background";

describe("TexturedBackground", () => {
  it("renders a non-interactive backdrop with gradient, shapes and grain", () => {
    const { container } = render(<TexturedBackground variant="olive" />);
    const root = container.firstChild;
    expect(root).toHaveAttribute("aria-hidden", "true");
    expect(root.className).toContain("pointer-events-none");
    // gradient layer + 2 shapes + grain overlay
    expect(root.querySelectorAll("div").length).toBeGreaterThanOrEqual(4);
  });

  it("falls back to the coral variant for an unknown variant", () => {
    const { container } = render(<TexturedBackground variant="nope" />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
