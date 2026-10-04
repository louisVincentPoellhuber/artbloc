import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
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
  const lightboxMessages = {
    lightbox: {
      label: "Image agrandie",
      close: "Fermer",
      previous: "Image précédente",
      next: "Image suivante",
      zoom: "Agrandir l'image",
    },
  };

  function renderCaptioned(props) {
    return render(
      <NextIntlClientProvider locale="fr" messages={lightboxMessages}>
        <CaptionedImage {...props} />
      </NextIntlClientProvider>
    );
  }

  it("renders the caption", () => {
    renderCaptioned({ image: "/x.png", caption: "Une légende", variant: "full" });
    expect(screen.getByText("Une légende")).toBeInTheDocument();
  });

  it("zooms a single image without arrow controls", () => {
    renderCaptioned({ image: "/x.png", caption: "Une légende", variant: "full" });
    fireEvent.click(screen.getByRole("button", { name: "Une légende" }));

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Image suivante" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Image précédente" })).not.toBeInTheDocument();
  });
});

describe("VideoEmbed", () => {
  it("renders a YouTube iframe for the id", () => {
    const { container } = render(
      <NextIntlClientProvider locale="fr" messages={{ video: { title: "Vidéo Art Bloc" } }}>
        <VideoEmbed id="abc123" />
      </NextIntlClientProvider>
    );
    const iframe = container.querySelector("iframe");
    expect(iframe).toBeTruthy();
    expect(iframe.getAttribute("src")).toContain("abc123");
  });
});
