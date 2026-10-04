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

  it("scrubs to a gallery image on mouse enter", () => {
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
    // The overlay shows one of the gallery images, not the avatar.
    const overlay = imgs[1];
    expect(["/a.png", "/b.png", "/c.png"].some((s) => overlay.getAttribute("src").includes(s.slice(1)))).toBe(true);
  });
});
