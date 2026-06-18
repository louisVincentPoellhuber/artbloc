import { describe, it, expect } from "vitest";
import { shouldHide } from "@/lib/use-hide-on-scroll";

describe("shouldHide", () => {
  it("hides when scrolling down past the threshold", () => {
    expect(shouldHide({ y: 200, lastY: 100, threshold: 80 })).toBe(true);
  });
  it("reveals when scrolling up", () => {
    expect(shouldHide({ y: 100, lastY: 200, threshold: 80 })).toBe(false);
  });
  it("stays visible near the top regardless of direction", () => {
    expect(shouldHide({ y: 40, lastY: 100, threshold: 80 })).toBe(false);
  });
});
