import { describe, it, expect } from "vitest";
import { headerHidden, shouldHide } from "@/lib/use-hide-on-scroll";

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

describe("headerHidden", () => {
  it("hides when scroll says hide and the menu is closed", () => {
    expect(headerHidden({ hidden: true, menuOpen: false })).toBe(true);
  });

  it("stays visible while the menu is open, whatever the scroll says", () => {
    expect(headerHidden({ hidden: true, menuOpen: true })).toBe(false);
  });

  it("stays visible when scroll says show", () => {
    expect(headerHidden({ hidden: false, menuOpen: false })).toBe(false);
  });
});
