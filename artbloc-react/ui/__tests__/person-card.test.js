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

  // The visible layer is the one at full opacity; its source is the current item.
  const shownSrc = (container) => container.querySelector(".opacity-100")?.getAttribute("src");
  const imgBySrc = (container, name) =>
    [...container.querySelectorAll("img")].find((im) => im.getAttribute("src")?.includes(name));

  it("shows the avatar as the first item before any hover", () => {
    const { container } = render(
      <PersonCard
        image="/avatar.png"
        images={[{ src: "/a.png" }, { src: "/b.png" }]}
        primary="A"
        secondary="b"
        color="coral"
      />
    );
    expect(container.querySelectorAll("img").length).toBe(1);
    expect(shownSrc(container)).toContain("avatar");
  });

  it("buffers the next item on entry without revealing it until it loads, and keeps it after leaving", () => {
    const { container } = render(
      <PersonCard
        image="/avatar.png"
        images={[{ src: "/a.png" }, { src: "/b.png" }]}
        primary="A"
        secondary="b"
        color="coral"
      />
    );
    const card = container.firstChild; // hover zone is the whole card

    // Entering mounts the next item (so it can load) but keeps the avatar
    // visible until that image has loaded — this is what prevents the flash.
    fireEvent.mouseEnter(card);
    expect(imgBySrc(container, "a.png")).toBeTruthy();
    expect(shownSrc(container)).toContain("avatar");

    // Leaving does not revert or unmount the buffered layer.
    fireEvent.mouseLeave(card);
    expect(imgBySrc(container, "a.png")).toBeTruthy();
  });

  it("includes a video item in the rotation", () => {
    const { container } = render(
      <PersonCard
        image="/avatar.png"
        images={[{ src: "/clip.mp4" }, { src: "/a.png" }]}
        primary="A"
        secondary="b"
        color="coral"
      />
    );
    const card = container.firstChild;
    // First entry reaches the video item; it mounts as a <video> with both sources.
    fireEvent.mouseEnter(card);
    const video = container.querySelector("video");
    expect(video).not.toBeNull();
    const types = [...video.querySelectorAll("source")].map((s) => s.getAttribute("type"));
    expect(types).toEqual(["video/webm", "video/mp4"]);
  });
});
