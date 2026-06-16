import { describe, it, expect } from "vitest";
import { localize, deepLocalize } from "@/lib/localize";

describe("localize", () => {
  it("returns the requested locale", () => {
    expect(localize({ fr: "Bonjour", en: "Hello" }, "en")).toBe("Hello");
  });

  it("falls back to French when the locale is missing", () => {
    expect(localize({ fr: "Bonjour" }, "en")).toBe("Bonjour");
  });
});

describe("deepLocalize", () => {
  it("resolves locale maps nested in objects and arrays, leaving other values intact", () => {
    const input = {
      name: "Louis",
      mediums: ["Pixel art", "Guitar"],
      blocks: [
        { type: "richText", text: { fr: "Salut", en: "Hi" } },
        { type: "videoEmbed", id: "abc" },
      ],
    };
    expect(deepLocalize(input, "en")).toEqual({
      name: "Louis",
      mediums: ["Pixel art", "Guitar"],
      blocks: [
        { type: "richText", text: "Hi" },
        { type: "videoEmbed", id: "abc" },
      ],
    });
  });
});
