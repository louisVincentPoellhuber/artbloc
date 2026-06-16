import { describe, it, expect } from "vitest";
import { deriveArtistColor } from "@/lib/colors";

const events = [
  { slug: "old", date: "2025-11-15", color: "teal", artists: ["lvp"] },
  { slug: "new", date: "2026-11-01", color: "coral", artists: ["lvp"] },
  { slug: "other", date: "2026-12-01", color: "teal", artists: ["someone-else"] },
];

describe("deriveArtistColor", () => {
  it("uses the most recent event the artist appears in", () => {
    expect(deriveArtistColor("lvp", events)).toBe("coral");
  });

  it("falls back to coral when the artist is in no event", () => {
    expect(deriveArtistColor("nobody", events)).toBe("coral");
  });
});
