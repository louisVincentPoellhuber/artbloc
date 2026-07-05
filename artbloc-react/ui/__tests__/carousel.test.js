import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import Carousel from "@/ui/carousel";

const messages = { carousel: { label: "Carrousel", previous: "Précédent", next: "Suivant" } };

function renderCarousel(ui) {
  return render(
    <NextIntlClientProvider locale="fr" messages={messages}>
      {ui}
    </NextIntlClientProvider>
  );
}

describe("Carousel", () => {
  it("renders its children and prev/next controls", () => {
    renderCarousel(
      <Carousel>
        <div>Item 1</div>
        <div>Item 2</div>
      </Carousel>
    );
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Précédent" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Suivant" })).toBeInTheDocument();
  });

  it("scrolls when an arrow is clicked", () => {
    const scrollBy = vi.fn();
    Element.prototype.scrollBy = scrollBy; // jsdom doesn't implement it
    renderCarousel(
      <Carousel>
        <div>Only</div>
      </Carousel>
    );
    fireEvent.click(screen.getByRole("button", { name: "Suivant" }));
    expect(scrollBy).toHaveBeenCalled();
  });

  it("suppresses the click that ends a mouse drag", () => {
    const onClick = vi.fn((e) => e.preventDefault());
    renderCarousel(
      <Carousel>
        <a href="/x" onClick={onClick}>
          Card
        </a>
      </Carousel>
    );
    const track = screen.getByRole("group");
    fireEvent.pointerDown(track, { pointerType: "mouse", clientX: 200 });
    fireEvent.pointerMove(track, { pointerType: "mouse", clientX: 60 });
    fireEvent.pointerUp(track, { pointerType: "mouse", clientX: 60 });
    fireEvent.click(screen.getByText("Card"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("lets a click through when there was no drag", () => {
    const onClick = vi.fn((e) => e.preventDefault());
    renderCarousel(
      <Carousel>
        <a href="/x" onClick={onClick}>
          Card
        </a>
      </Carousel>
    );
    fireEvent.click(screen.getByText("Card"));
    expect(onClick).toHaveBeenCalled();
  });
});
