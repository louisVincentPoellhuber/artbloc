import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Socials from "@/ui/socials";

describe("Socials", () => {
  it("builds an instagram url from a bare handle", () => {
    render(<Socials socials={{ instagram: "louis.vp" }} />);
    const link = screen.getByRole("link", { name: /louis\.vp/ });
    expect(link).toHaveAttribute("href", "https://instagram.com/louis.vp");
  });

  it("renders email as a mailto and website/etsy as links, plus otherLinks", () => {
    render(
      <Socials
        socials={{
          email: "x@x.com",
          website: "https://x.ca",
          etsy: "https://etsy.com/shop/x",
          otherLinks: [{ label: "The Maybes", url: "https://instagram.com/the.maybes.band" }],
        }}
      />
    );
    expect(screen.getByRole("link", { name: /x@x\.com/ })).toHaveAttribute("href", "mailto:x@x.com");
    expect(screen.getByRole("link", { name: /x\.ca/ })).toHaveAttribute("href", "https://x.ca");
    expect(screen.getByRole("link", { name: /The Maybes/ })).toBeInTheDocument();
  });

  it("renders nothing when socials is empty/undefined", () => {
    const { container } = render(<Socials />);
    expect(container.firstChild).toBeNull();
  });
});
