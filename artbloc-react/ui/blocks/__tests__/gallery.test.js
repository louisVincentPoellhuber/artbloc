import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import Gallery from "@/ui/blocks/gallery";

describe("Gallery", () => {
  it("renders one image per entry", () => {
    const { container } = render(
      <Gallery images={[{ src: "/a.png" }, { src: "/b.png" }, { src: "/c.png" }]} />
    );
    expect(container.querySelectorAll("img").length).toBe(3);
  });

  it("renders alt text when present and empty alt when absent", () => {
    const { container } = render(
      <Gallery images={[{ src: "/a.png", alt: "Une œuvre" }, { src: "/b.png" }]} columns={2} />
    );
    const imgs = container.querySelectorAll("img");
    expect(imgs[0].getAttribute("alt")).toBe("Une œuvre");
    expect(imgs[1].getAttribute("alt")).toBe("");
  });
});
