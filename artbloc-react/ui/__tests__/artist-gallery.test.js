import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import ArtistGallery from "@/ui/artist-gallery";

const images = [{ src: "/a/1.png" }, { src: "/a/2.png" }, { src: "/a/3.png" }];

describe("ArtistGallery", () => {
  it("renders one image per entry", () => {
    const { container } = render(<ArtistGallery images={images} />);
    expect(container.querySelectorAll("img").length).toBe(3);
  });

  it("renders nothing when there are no images", () => {
    const { container } = render(<ArtistGallery images={[]} />);
    expect(container.firstChild).toBeNull();
  });
});
