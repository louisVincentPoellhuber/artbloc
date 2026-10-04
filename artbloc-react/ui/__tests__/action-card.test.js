import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ActionCard from "@/ui/action-card";

describe("ActionCard", () => {
  it("renders the title and body", () => {
    render(<ActionCard title="Joindre en tant qu'artiste" body="Description ici" href="/x" />);
    expect(screen.getByText("Joindre en tant qu'artiste")).toBeInTheDocument();
    expect(screen.getByText("Description ici")).toBeInTheDocument();
  });

  it("renders an arrow link to the href", () => {
    render(<ActionCard title="Titre" body="Corps" href="https://example.test" />);
    const link = screen.getByRole("link");
    expect(link.getAttribute("href")).toBe("https://example.test");
  });

  it("exposes exactly one link, so the card and its arrow are not duplicate stops", () => {
    render(<ActionCard title="Titre" body="Corps" href="https://example.test" />);
    expect(screen.getAllByRole("link")).toHaveLength(1);
  });

  it("stretches the link over the whole card", () => {
    render(<ActionCard title="Titre" body="Corps" href="https://example.test" />);
    // The overlay is what makes the card clickable without a second anchor.
    expect(screen.getByRole("link").className).toContain("after:absolute");
    expect(screen.getByRole("link").className).toContain("after:inset-0");
  });

  it("opens an external destination in a new tab", () => {
    render(<ActionCard title="Titre" body="Corps" href="https://www.zeffy.com/x" />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noreferrer");
  });

  it("keeps a mailto destination in the same tab", () => {
    render(<ActionCard title="Titre" body="Corps" href="mailto:hello@artbloc.ca" />);
    const link = screen.getByRole("link");
    expect(link).not.toHaveAttribute("target");
  });

  it("renders inert with no destination, rather than a dead click target", () => {
    render(<ActionCard title="Titre" body="Corps" />);
    expect(screen.getByText("Titre")).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
