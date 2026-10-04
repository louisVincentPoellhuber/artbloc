import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import RoleBlock from "@/ui/role-block";

describe("RoleBlock", () => {
  it("renders the role title and description", () => {
    render(<RoleBlock heading="At Art Bloc" role="Communications" description="Runs comms." />);
    expect(screen.getByText("Communications")).toBeInTheDocument();
    expect(screen.getByText("Runs comms.")).toBeInTheDocument();
  });

  it("renders nothing without a description", () => {
    const { container } = render(<RoleBlock heading="At Art Bloc" role="X" description={undefined} />);
    expect(container.firstChild).toBeNull();
  });
});
