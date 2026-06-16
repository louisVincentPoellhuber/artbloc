import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import PageTitle from "@/ui/page-title";
import MediumTags from "@/ui/medium-tags";

describe("PageTitle", () => {
  it("renders its children in a heading", () => {
    render(<PageTitle>Louis-Vincent</PageTitle>);
    expect(
      screen.getByRole("heading", { name: /Louis-Vincent/ })
    ).toBeInTheDocument();
  });
});

describe("MediumTags", () => {
  it("joins tags with a dot separator", () => {
    render(<MediumTags tags={["Pixel art", "Guitar"]} />);
    expect(screen.getByText("Pixel art • Guitar")).toBeInTheDocument();
  });
});
