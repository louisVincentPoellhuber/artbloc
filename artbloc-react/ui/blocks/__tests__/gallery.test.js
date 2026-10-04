import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import Gallery from "@/ui/blocks/gallery";

const messages = {
  lightbox: {
    label: "Image agrandie",
    close: "Fermer",
    previous: "Image précédente",
    next: "Image suivante",
    zoom: "Agrandir l'image",
  },
};

function renderGallery(ui) {
  return render(
    <NextIntlClientProvider locale="fr" messages={messages}>
      {ui}
    </NextIntlClientProvider>
  );
}

describe("Gallery", () => {
  it("renders one image per entry", () => {
    const { container } = renderGallery(
      <Gallery images={[{ src: "/a.png" }, { src: "/b.png" }, { src: "/c.png" }]} />
    );
    expect(container.querySelectorAll("img").length).toBe(3);
  });

  it("renders alt text when present and empty alt when absent", () => {
    const { container } = renderGallery(
      <Gallery images={[{ src: "/a.png", alt: "Une œuvre" }, { src: "/b.png" }]} columns={2} />
    );
    const imgs = container.querySelectorAll("img");
    expect(imgs[0].getAttribute("alt")).toBe("Une œuvre");
    expect(imgs[1].getAttribute("alt")).toBe("");
  });

  it("opens the zoom overlay on the image that was clicked", () => {
    renderGallery(
      <Gallery images={[{ src: "/a.png", alt: "Une œuvre" }, { src: "/b.png" }]} columns={2} />
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Une œuvre" }));
    const dialog = screen.getByRole("dialog");
    expect(dialog.querySelector("img").getAttribute("src")).toContain("a.png");
  });

  it("labels a zoom trigger that has no alt text", () => {
    renderGallery(<Gallery images={[{ src: "/b.png" }]} columns={2} />);
    expect(screen.getByRole("button", { name: "Agrandir l'image" })).toBeInTheDocument();
  });
});
