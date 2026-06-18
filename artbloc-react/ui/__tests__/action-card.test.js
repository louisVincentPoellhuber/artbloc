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
});
