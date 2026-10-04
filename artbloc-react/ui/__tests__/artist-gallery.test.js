import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import ArtistGallery from "@/ui/artist-gallery";

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

const images = [{ src: "/a/1.png" }, { src: "/a/2.png" }, { src: "/a/3.png" }];

describe("ArtistGallery", () => {
  it("renders one image per entry", () => {
    const { container } = renderGallery(<ArtistGallery images={images} />);
    expect(container.querySelectorAll("img").length).toBe(3);
  });

  it("renders nothing when there are no images", () => {
    const { container } = renderGallery(<ArtistGallery images={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it("opens the zoom lightbox on the item that was clicked", () => {
    renderGallery(
      <ArtistGallery images={[{ src: "/a/1.png", alt: "Une œuvre" }, { src: "/a/2.png" }]} />
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Une œuvre" }));
    const dialog = screen.getByRole("dialog");
    expect(dialog.querySelector("img").getAttribute("src")).toContain("1.png");
  });

  it("renders a video item as a looping video, not an image", () => {
    const { container } = renderGallery(
      <ArtistGallery images={[{ src: "/a/1.png" }, { src: "/a/clip.mp4" }]} />
    );
    const video = container.querySelector("video");
    expect(video).not.toBeNull();
    expect(video.hasAttribute("loop")).toBe(true);
    const types = [...video.querySelectorAll("source")].map((s) => s.getAttribute("type"));
    expect(types).toEqual(["video/webm", "video/mp4"]);
    // The still image still renders as an <img>.
    expect(container.querySelectorAll("img").length).toBe(1);
  });
});
