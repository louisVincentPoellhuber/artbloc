import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import PersonCard from "@/ui/person-card";

describe("PersonCard", () => {
  it("renders the primary and secondary lines", () => {
    render(
      <PersonCard image="/x.png" primary="Jenny Meng" secondary="Peinture à l'huile" color="teal" />
    );
    expect(screen.getByText("Jenny Meng")).toBeInTheDocument();
    expect(screen.getByText("Peinture à l'huile")).toBeInTheDocument();
  });

  it("applies the base color to the primary line and the soft shade to the secondary", () => {
    render(
      <PersonCard image="/x.png" primary="Jenny Meng" secondary="Peinture à l'huile" color="teal" />
    );
    expect(screen.getByText("Jenny Meng").className).toContain("bg-teal");
    expect(screen.getByText("Peinture à l'huile").className).toContain("bg-teal-soft");
  });

  it("renders the image with the name as alt text", () => {
    render(<PersonCard image="/x.png" primary="Jenny Meng" secondary="Illustration" color="coral" />);
    expect(screen.getByAltText("Jenny Meng")).toBeInTheDocument();
  });

  it("renders only the base image when no hoverImage", () => {
    const { container } = render(
      <PersonCard image="/x.png" primary="A" secondary="b" color="coral" />
    );
    expect(container.querySelectorAll("img").length).toBe(1);
  });

  it("renders a second crossfade image when hoverImage is set", () => {
    const { container } = render(
      <PersonCard image="/x.png" hoverImage="/y.png" primary="A" secondary="b" color="coral" />
    );
    expect(container.querySelectorAll("img").length).toBe(2);
  });

  it("shows only the base image before hover when a gallery is provided", () => {
    const { container } = render(
      <PersonCard
        image="/avatar.png"
        images={[{ src: "/a.png" }, { src: "/b.png" }, { src: "/c.png" }]}
        primary="A"
        secondary="b"
        color="coral"
      />
    );
    expect(container.querySelectorAll("img").length).toBe(1);
  });

  // The current artwork is the last <img> (it fades in over the previous one).
  const currentSrc = (container) => {
    const imgs = container.querySelectorAll("img");
    return imgs[imgs.length - 1]?.getAttribute("src");
  };

  it("swaps to a gallery image when the cursor enters anywhere on the card", () => {
    const { container } = render(
      <PersonCard
        image="/avatar.png"
        images={[{ src: "/a.png" }, { src: "/b.png" }, { src: "/c.png" }]}
        primary="A"
        secondary="b"
        color="coral"
      />
    );
    // Hover zone is the whole card root, not just the image.
    const card = container.firstChild;
    fireEvent.mouseEnter(card);
    expect(container.querySelectorAll("img").length).toBe(2);
    expect(currentSrc(container)).toContain("a.png");
  });

  it("advances in order on each entry and keeps the image after leaving", () => {
    const { container } = render(
      <PersonCard
        image="/avatar.png"
        images={[{ src: "/a.png" }, { src: "/b.png" }, { src: "/c.png" }]}
        primary="A"
        secondary="b"
        color="coral"
      />
    );
    const card = container.firstChild;

    fireEvent.mouseEnter(card);
    expect(currentSrc(container)).toContain("a.png");
    // Leaving does not revert: the image stays.
    fireEvent.mouseLeave(card);
    expect(currentSrc(container)).toContain("a.png");
    // Re-entering advances to the next image, in order.
    fireEvent.mouseEnter(card);
    expect(currentSrc(container)).toContain("b.png");
  });

  it("excludes video items from the swap set", () => {
    const { container } = render(
      <PersonCard
        image="/avatar.png"
        images={[{ src: "/a.png" }, { src: "/clip.mp4" }]}
        primary="A"
        secondary="b"
        color="coral"
      />
    );
    const card = container.firstChild;
    // Enter twice; only the single still image is ever shown (never the video).
    fireEvent.mouseEnter(card);
    fireEvent.mouseEnter(card);
    expect(currentSrc(container)).toContain("a.png");
    expect(container.querySelector("video")).toBeNull();
  });
});
