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

  it("does not capture the pointer until the movement is actually a drag", () => {
    // Capturing on pointerdown retargets pointerup — and therefore the click —
    // to the track, so a plain click never reaches the card's link.
    const setPointerCapture = vi.fn();
    Element.prototype.setPointerCapture = setPointerCapture;
    Element.prototype.releasePointerCapture = vi.fn();

    renderCarousel(
      <Carousel>
        <div>Card</div>
      </Carousel>
    );
    const track = screen.getByRole("group");

    fireEvent.pointerDown(track, { pointerType: "mouse", clientX: 200, pointerId: 1 });
    expect(setPointerCapture).not.toHaveBeenCalled();

    // Under the 4px threshold: still a click, not a drag.
    fireEvent.pointerMove(track, { pointerType: "mouse", clientX: 202, pointerId: 1 });
    expect(setPointerCapture).not.toHaveBeenCalled();

    // Past the threshold it is a drag, and capture is what keeps it smooth.
    fireEvent.pointerMove(track, { pointerType: "mouse", clientX: 150, pointerId: 1 });
    expect(setPointerCapture).toHaveBeenCalledWith(1);
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
