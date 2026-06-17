import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import PersonCard from "@/ui/person-card";

describe("PersonCard", () => {
  it("renders the primary and secondary lines", () => {
    render(
      <PersonCard image="/x.png" primary="Jennie Ming" secondary="Peinture à l'huile" color="teal" />
    );
    expect(screen.getByText("Jennie Ming")).toBeInTheDocument();
    expect(screen.getByText("Peinture à l'huile")).toBeInTheDocument();
  });

  it("applies the base color to the primary line and the soft shade to the secondary", () => {
    render(
      <PersonCard image="/x.png" primary="Jennie Ming" secondary="Peinture à l'huile" color="teal" />
    );
    expect(screen.getByText("Jennie Ming").className).toContain("bg-teal");
    expect(screen.getByText("Peinture à l'huile").className).toContain("bg-teal-soft");
  });

  it("renders the image with the name as alt text", () => {
    render(<PersonCard image="/x.png" primary="Jennie Ming" secondary="Illustration" color="coral" />);
    expect(screen.getByAltText("Jennie Ming")).toBeInTheDocument();
  });
});
