import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import HomeHero from "@/ui/home-hero";

describe("HomeHero", () => {
  it("renders the wordmark, tagline and slideshow images", () => {
    const { container } = render(
      <HomeHero images={["/a.png", "/b.png"]} tagline="Expositions éphémères" />
    );
    expect(screen.getByText("ART BLOC")).toBeInTheDocument();
    expect(screen.getByText("Expositions éphémères")).toBeInTheDocument();
    expect(container.querySelectorAll("img").length).toBe(2);
  });
});
