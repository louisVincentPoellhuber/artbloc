import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import GradientSphere from "@/ui/gradient-sphere";
import GradientSphereCluster from "@/ui/gradient-sphere-cluster";

describe("GradientSphere", () => {
  it("renders its label", () => {
    render(<GradientSphere label="Musique" />);
    expect(screen.getByText("Musique")).toBeInTheDocument();
  });
});

describe("GradientSphereCluster", () => {
  it("renders one sphere per label", () => {
    render(<GradientSphereCluster labels={["Un", "Deux", "Trois"]} />);
    expect(screen.getByText("Un")).toBeInTheDocument();
    expect(screen.getByText("Trois")).toBeInTheDocument();
  });

  it("caps at seven labels", () => {
    render(<GradientSphereCluster labels={["1", "2", "3", "4", "5", "6", "7", "8"]} />);
    expect(screen.getByText("7")).toBeInTheDocument();
    expect(screen.queryByText("8")).toBeNull();
  });
});
