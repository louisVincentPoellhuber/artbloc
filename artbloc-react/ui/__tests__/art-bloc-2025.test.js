import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ArtBloc2025 from "@/ui/art-bloc-2025";

describe("ArtBloc2025", () => {
  it("renders a labelled strip of images", () => {
    render(<ArtBloc2025 label="At Art Bloc 2025" images={[{ src: "/a/1.jpg" }, { src: "/a/2.jpg" }]} />);
    expect(screen.getByText("At Art Bloc 2025")).toBeInTheDocument();
    expect(document.querySelectorAll("img").length).toBe(2);
  });

  it("renders nothing with no images", () => {
    const { container } = render(<ArtBloc2025 label="x" images={[]} />);
    expect(container.firstChild).toBeNull();
  });
});
