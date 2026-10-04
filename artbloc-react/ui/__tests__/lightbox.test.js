import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { useLightbox } from "@/ui/lightbox";

const messages = {
  lightbox: {
    label: "Image agrandie",
    close: "Fermer",
    previous: "Image précédente",
    next: "Image suivante",
    zoom: "Agrandir l'image",
  },
};

const IMAGES = [
  { src: "/a.png", alt: "Première œuvre" },
  { src: "/b.png", alt: "Deuxième œuvre" },
  { src: "/c.png" },
];

// Minimal host that exercises the hook the way the real blocks do.
function Host({ images = IMAGES }) {
  const { open, overlay } = useLightbox(images);
  return (
    <div>
      {images.map((image, i) => (
        <button key={i} type="button" onClick={() => open(i)}>
          {`trigger-${i}`}
        </button>
      ))}
      {overlay}
    </div>
  );
}

function renderHost(props) {
  return render(
    <NextIntlClientProvider locale="fr" messages={messages}>
      <Host {...props} />
    </NextIntlClientProvider>
  );
}

// Queried by element, not by role: an image with no alt renders alt="" and is
// correctly absent from the accessibility tree, so getByRole("img") would miss it.
function currentSrc() {
  return screen.getByRole("dialog").querySelector("img")?.getAttribute("src");
}

describe("useLightbox", () => {
  it("stays closed until a trigger opens it", () => {
    renderHost();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("opens on the image that was clicked, not the first one", () => {
    renderHost();
    fireEvent.click(screen.getByText("trigger-1"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(currentSrc()).toContain("b.png");
  });

  it("moves forward and back with the arrow controls", () => {
    renderHost();
    fireEvent.click(screen.getByText("trigger-0"));
    fireEvent.click(screen.getByRole("button", { name: "Image suivante" }));
    expect(currentSrc()).toContain("b.png");
    fireEvent.click(screen.getByRole("button", { name: "Image précédente" }));
    expect(currentSrc()).toContain("a.png");
  });

  it("wraps around at both ends", () => {
    renderHost();
    fireEvent.click(screen.getByText("trigger-0"));
    fireEvent.click(screen.getByRole("button", { name: "Image précédente" }));
    expect(currentSrc()).toContain("c.png");
    fireEvent.click(screen.getByRole("button", { name: "Image suivante" }));
    expect(currentSrc()).toContain("a.png");
  });

  it("navigates with the left and right arrow keys", () => {
    renderHost();
    fireEvent.click(screen.getByText("trigger-0"));
    fireEvent.keyDown(document, { key: "ArrowRight" });
    expect(currentSrc()).toContain("b.png");
    fireEvent.keyDown(document, { key: "ArrowLeft" });
    expect(currentSrc()).toContain("a.png");
  });

  it("closes on Escape and returns focus to the trigger that opened it", () => {
    renderHost();
    const trigger = screen.getByText("trigger-2");
    trigger.focus();
    fireEvent.click(trigger);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("closes with the close control", () => {
    renderHost();
    fireEvent.click(screen.getByText("trigger-0"));
    fireEvent.click(screen.getByRole("button", { name: "Fermer" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("carries the image's alt text into the overlay", () => {
    renderHost();
    fireEvent.click(screen.getByText("trigger-0"));
    expect(within(screen.getByRole("dialog")).getByAltText("Première œuvre")).toBeInTheDocument();
  });

  it("hides the arrows when there is only one image", () => {
    renderHost({ images: [IMAGES[0]] });
    fireEvent.click(screen.getByText("trigger-0"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Image suivante" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Image précédente" })).not.toBeInTheDocument();
  });

  it("locks body scroll while open and restores it on close", () => {
    renderHost();
    fireEvent.click(screen.getByText("trigger-0"));
    expect(document.body.style.overflow).toBe("hidden");
    fireEvent.keyDown(document, { key: "Escape" });
    expect(document.body.style.overflow).not.toBe("hidden");
  });
});
