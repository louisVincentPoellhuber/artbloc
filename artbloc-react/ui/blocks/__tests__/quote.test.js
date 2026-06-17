import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Quote from "@/ui/blocks/quote";

describe("Quote", () => {
  it("renders the quote text", () => {
    render(<Quote text="La curiosité du quotidien" />);
    expect(screen.getByText("La curiosité du quotidien")).toBeInTheDocument();
  });

  it("renders attribution when provided", () => {
    render(<Quote text="La curiosité" attribution="Louis-Vincent" />);
    expect(screen.getByText(/Louis-Vincent/)).toBeInTheDocument();
  });

  it("omits attribution when absent", () => {
    render(<Quote text="La curiosité" />);
    expect(screen.queryByText(/—/)).toBeNull();
  });
});
