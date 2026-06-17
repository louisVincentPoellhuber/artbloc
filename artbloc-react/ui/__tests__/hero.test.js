import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Hero from "@/ui/hero";

describe("Hero", () => {
  it("renders the title, date and venue", () => {
    render(<Hero poster="/p.png" title="Fragments" date="15 novembre 2025" venue="Bâtiment 7" upcoming={false} />);
    expect(screen.getByText("Fragments")).toBeInTheDocument();
    expect(screen.getByText(/Bâtiment 7/)).toBeInTheDocument();
  });

  it("shows the tickets button only when upcoming with a ticketsUrl", () => {
    render(
      <Hero poster="/p.png" title="Frontières" date="novembre 2026" upcoming ticketsUrl="https://x" ticketsLabel="Billets" />
    );
    expect(screen.getByText("Billets")).toBeInTheDocument();
  });

  it("omits the tickets button when not upcoming", () => {
    render(<Hero poster="/p.png" title="Fragments" date="2025" upcoming={false} ticketsUrl="https://x" ticketsLabel="Billets" />);
    expect(screen.queryByText("Billets")).toBeNull();
  });
});
