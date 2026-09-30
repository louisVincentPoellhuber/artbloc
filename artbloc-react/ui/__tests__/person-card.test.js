import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
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
});
