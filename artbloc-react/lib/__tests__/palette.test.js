import { describe, it, expect } from "vitest";
import { colorClasses } from "@/lib/palette";

describe("colorClasses", () => {
  it("maps a token to static Tailwind classes", () => {
    expect(colorClasses("coral").bg).toBe("bg-coral");
    expect(colorClasses("teal").bg).toBe("bg-teal");
  });

  it("falls back to coral for an unknown token", () => {
    expect(colorClasses("bogus").bg).toBe("bg-coral");
  });
});
