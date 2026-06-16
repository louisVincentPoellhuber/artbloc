import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import RichText from "@/ui/blocks/rich-text";
import CaptionedImage from "@/ui/blocks/captioned-image";
import VideoEmbed from "@/ui/blocks/video-embed";

describe("RichText", () => {
  it("renders its text", () => {
    render(<RichText text="Bonjour le monde" />);
    expect(screen.getByText("Bonjour le monde")).toBeInTheDocument();
  });
});

describe("CaptionedImage", () => {
  it("renders the caption", () => {
    render(<CaptionedImage image="/x.png" caption="Une légende" variant="full" />);
    expect(screen.getByText("Une légende")).toBeInTheDocument();
  });
});

describe("VideoEmbed", () => {
  it("renders a YouTube iframe for the id", () => {
    const { container } = render(<VideoEmbed id="abc123" />);
    const iframe = container.querySelector("iframe");
    expect(iframe).toBeTruthy();
    expect(iframe.getAttribute("src")).toContain("abc123");
  });
});
