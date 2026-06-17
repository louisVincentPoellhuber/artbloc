import { describe, it, expect } from "vitest";
import { artistSchema, eventSchema, Block } from "@/lib/schemas";

const validArtist = {
  slug: "lvp",
  name: "Louis-Vincent Poellhuber",
  mediums: ["Pixel art"],
  avatar: "/a.png",
  blocks: [{ type: "richText", text: { fr: "Salut", en: "Hi" } }],
};

describe("artistSchema", () => {
  it("accepts a valid artist", () => {
    expect(() => artistSchema.parse(validArtist)).not.toThrow();
  });

  it("rejects an artist missing a required field", () => {
    const { name, ...broken } = validArtist;
    expect(() => artistSchema.parse(broken)).toThrow();
  });

  it("rejects a block text missing the fr translation", () => {
    const broken = {
      ...validArtist,
      blocks: [{ type: "richText", text: { en: "Hi" } }],
    };
    expect(() => artistSchema.parse(broken)).toThrow();
  });
});

describe("Block discriminated union", () => {
  it("defaults captionedImage variant to full", () => {
    const parsed = Block.parse({ type: "captionedImage", image: "/x.png" });
    expect(parsed.variant).toBe("full");
  });

  it("rejects an unknown block type", () => {
    expect(() => Block.parse({ type: "nope" })).toThrow();
  });
});

describe("eventSchema", () => {
  it("accepts a valid event and defaults arrays", () => {
    const parsed = eventSchema.parse({
      slug: "e1",
      title: { fr: "T", en: "T" },
      date: "2026-01-01",
      color: "coral",
    });
    expect(parsed.artists).toEqual([]);
    expect(parsed.categories).toEqual([]);
  });
});

describe("new block types (1B)", () => {
  it("parses quote with and without attribution", () => {
    expect(() => Block.parse({ type: "quote", text: { fr: "x", en: "x" } })).not.toThrow();
    expect(() =>
      Block.parse({ type: "quote", text: { fr: "x" }, attribution: { fr: "y" } })
    ).not.toThrow();
  });

  it("defaults textImage side to left", () => {
    const b = Block.parse({ type: "textImage", text: { fr: "x" }, image: "/a.png" });
    expect(b.side).toBe("left");
  });

  it("requires >=1 gallery image and defaults columns to 3", () => {
    expect(() => Block.parse({ type: "gallery", images: [] })).toThrow();
    expect(Block.parse({ type: "gallery", images: ["/a.png"] }).columns).toBe(3);
  });

  it("requires color and text on coloredSection", () => {
    expect(() => Block.parse({ type: "coloredSection", text: { fr: "x" } })).toThrow();
    expect(() =>
      Block.parse({ type: "coloredSection", color: "coral", text: { fr: "x" } })
    ).not.toThrow();
  });
});
