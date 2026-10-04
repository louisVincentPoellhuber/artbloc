import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import InterviewEmbed from "@/ui/interview-embed";

function renderEmbed(props) {
  return render(
    <NextIntlClientProvider locale="fr" messages={{ artist: { interviewTitle: "Entrevue" } }}>
      <InterviewEmbed {...props} />
    </NextIntlClientProvider>
  );
}

describe("InterviewEmbed", () => {
  it("embeds the youtube id", () => {
    const { container } = renderEmbed({ youtubeId: "8k_GXvwk2d8" });
    const iframe = container.querySelector("iframe");
    expect(iframe.getAttribute("src")).toContain("youtube.com/embed/8k_GXvwk2d8");
  });

  it("renders nothing without an id", () => {
    const { container } = renderEmbed({ youtubeId: undefined });
    expect(container.firstChild).toBeNull();
  });
});
