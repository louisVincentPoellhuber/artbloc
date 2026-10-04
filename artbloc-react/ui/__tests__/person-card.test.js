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

  it("swaps to a gallery image when the cursor enters", () => {
    const { container } = render(
      <PersonCard
        image="/avatar.png"
        images={[{ src: "/a.png" }, { src: "/b.png" }, { src: "/c.png" }]}
        primary="A"
        secondary="b"
        color="coral"
      />
    );
    const frame = container.querySelector("div.relative");
    fireEvent.mouseEnter(frame);
    const imgs = container.querySelectorAll("img");
    expect(imgs.length).toBe(2);
    const overlay = imgs[1];
    expect(["/a.png", "/b.png", "/c.png"].some((s) => overlay.getAttribute("src").includes(s.slice(1)))).toBe(true);
  });

  it("shows a different image on each entry and keeps it after leaving", () => {
    const { container } = render(
      <PersonCard
        image="/avatar.png"
        images={[{ src: "/a.png" }, { src: "/b.png" }, { src: "/c.png" }]}
        primary="A"
        secondary="b"
        color="coral"
      />
    );
    const frame = container.querySelector("div.relative");
    const overlaySrc = () => container.querySelectorAll("img")[1]?.getAttribute("src");

    fireEvent.mouseEnter(frame);
    const first = overlaySrc();
    // Leaving does not revert: the overlay image is still there.
    fireEvent.mouseLeave(frame);
    expect(container.querySelectorAll("img").length).toBe(2);
    expect(overlaySrc()).toBe(first);
    // Re-entering advances to a different image.
    fireEvent.mouseEnter(frame);
    expect(overlaySrc()).not.toBe(first);
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
    const frame = container.querySelector("div.relative");
    // Enter twice; only the single still image is ever shown (never the video).
    fireEvent.mouseEnter(frame);
    fireEvent.mouseEnter(frame);
    const overlay = container.querySelectorAll("img")[1];
    expect(overlay.getAttribute("src")).toContain("a.png");
    expect(container.querySelector("video")).toBeNull();
  });
});
