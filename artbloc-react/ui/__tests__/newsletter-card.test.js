import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import NewsletterCard from "@/ui/newsletter-card";

const EMBED = "https://www.zeffy.com/en-CA/embed/newsletter-form/x";

describe("NewsletterCard", () => {
  it("renders the card's own heading and body", () => {
    render(
      <NewsletterCard title="Inscrivez-vous à notre infolettre" body="Rejoignez-nous" embedUrl={EMBED} />
    );
    expect(screen.getByText("Inscrivez-vous à notre infolettre")).toBeInTheDocument();
    expect(screen.getByText("Rejoignez-nous")).toBeInTheDocument();
  });

  it("embeds the form and labels the frame with the card's heading", () => {
    const { container } = render(
      <NewsletterCard title="Inscrivez-vous à notre infolettre" body="Corps" embedUrl={EMBED} />
    );
    const iframe = container.querySelector("iframe");
    expect(iframe.getAttribute("src")).toBe(EMBED);
    // The frame's accessible name comes from the localized card title, so no
    // separate catalog entry is needed and it is never left in English.
    expect(iframe.getAttribute("title")).toBe("Inscrivez-vous à notre infolettre");
  });

  it("suppresses the embed's own scrollbar", () => {
    const { container } = render(<NewsletterCard title="T" body="B" embedUrl={EMBED} />);
    const iframe = container.querySelector("iframe");
    expect(iframe).toHaveAttribute("scrolling", "no");
    // The frame is taller than what shows; the wrapper clips it.
    expect(parseInt(iframe.style.height, 10)).toBeGreaterThan(
      parseInt(iframe.parentElement.style.height, 10)
    );
  });

  it("offsets the frame upward to hide the form's empty title row", () => {
    const { container } = render(<NewsletterCard title="T" body="B" embedUrl={EMBED} />);
    expect(parseInt(container.querySelector("iframe").style.top, 10)).toBeLessThan(0);
  });

  it("renders nothing when no embed is configured", () => {
    const { container } = render(<NewsletterCard title="T" body="B" />);
    expect(container.firstChild).toBeNull();
  });
});
