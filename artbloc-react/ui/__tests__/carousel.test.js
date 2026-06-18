import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Carousel from "@/ui/carousel";

describe("Carousel", () => {
  it("renders its children and prev/next controls", () => {
    render(
      <Carousel label="Galerie">
        <div>Item 1</div>
        <div>Item 2</div>
      </Carousel>
    );
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Previous" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Next" })).toBeInTheDocument();
  });

  it("scrolls when an arrow is clicked", () => {
    const scrollBy = vi.fn();
    Element.prototype.scrollBy = scrollBy; // jsdom doesn't implement it
    render(
      <Carousel>
        <div>Only</div>
      </Carousel>
    );
    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    expect(scrollBy).toHaveBeenCalled();
  });
});
