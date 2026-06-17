import { describe, it, expect } from "vitest";
import { colorClasses } from "@/lib/palette";

describe("colorClasses", () => {
  it("maps a token to static Tailwind classes", () => {
    expect(colorClasses("coral").bg).toBe("bg-coral");
    expect(colorClasses("teal").bg).toBe("bg-teal");
  });

  it("includes the soft shade for each token", () => {
    expect(colorClasses("coral").soft).toBe("bg-coral-soft");
    expect(colorClasses("teal").soft).toBe("bg-teal-soft");
  });

  it("falls back to coral (with soft) for an unknown token", () => {
    expect(colorClasses("bogus").bg).toBe("bg-coral");
    expect(colorClasses("bogus").soft).toBe("bg-coral-soft");
  });
});
