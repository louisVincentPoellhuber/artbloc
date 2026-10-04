import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Pillars from "@/ui/pillars";

const items = [
  { title: "Accessibilité", body: "Réduire les barrières." },
  { title: "Communauté", body: "Relier les artistes." },
  { title: "Multidisciplinarité", body: "Centré sur les artistes." },
];

describe("Pillars", () => {
  it("renders the heading and every pillar's title and body", () => {
    render(<Pillars heading="Nos piliers" items={items} />);
    expect(screen.getByRole("heading", { name: "Nos piliers" })).toBeInTheDocument();
    for (const { title, body } of items) {
      expect(screen.getByText(title)).toBeInTheDocument();
      expect(screen.getByText(body)).toBeInTheDocument();
    }
  });

  it("gives each card the teal background", () => {
    const { container } = render(<Pillars heading="Nos piliers" items={items} />);
    const cards = container.querySelectorAll(".bg-teal");
    expect(cards.length).toBe(items.length);
  });

  it("renders without a heading", () => {
    render(<Pillars items={items} />);
    expect(screen.getByText("Accessibilité")).toBeInTheDocument();
  });
});
