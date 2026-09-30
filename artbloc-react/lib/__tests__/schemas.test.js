import { describe, it, expect } from "vitest";
import { artistSchema, eventSchema, Block } from "@/lib/schemas";

const validArtist = {
  slug: "lvp",
  name: "Louis-Vincent Poellhuber",
  mediums: [{ fr: "Pixel art", en: "Pixel art" }],
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

  it("rejects a bare string medium", () => {
    const broken = { ...validArtist, mediums: ["Pixel art"] };
    expect(() => artistSchema.parse(broken)).toThrow();
  });

  it("accepts a medium with only the French translation", () => {
    const partial = { ...validArtist, mediums: [{ fr: "Gravure" }] };
    expect(() => artistSchema.parse(partial)).not.toThrow();
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
    expect(parsed.orientation).toBe("left");
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

  it("accepts gallery images as objects, with and without alt", () => {
    expect(() =>
      Block.parse({
        type: "gallery",
        images: [{ src: "/a.png" }, { src: "/b.png", alt: { fr: "Une œuvre", en: "A work" } }],
      })
    ).not.toThrow();
  });

  it("rejects bare string gallery images", () => {
    expect(() => Block.parse({ type: "gallery", images: ["/a.png"] })).toThrow();
  });

  it("still rejects an empty gallery", () => {
    expect(() => Block.parse({ type: "gallery", images: [] })).toThrow();
  });

  it("defaults gallery columns to 3", () => {
    expect(Block.parse({ type: "gallery", images: [{ src: "/a.png" }] }).columns).toBe(3);
  });

  it("requires color and text on coloredSection", () => {
    expect(() => Block.parse({ type: "coloredSection", text: { fr: "x" } })).toThrow();
    expect(() =>
      Block.parse({ type: "coloredSection", color: "coral", text: { fr: "x" } })
    ).not.toThrow();
  });
});

describe("carousel block (P3)", () => {
  it("accepts carousel images as objects and rejects an empty list", () => {
    expect(() => Block.parse({ type: "carousel", images: [{ src: "/a.png" }] })).not.toThrow();
    expect(() => Block.parse({ type: "carousel", images: [] })).toThrow();
  });
});

describe("event price (2B)", () => {
  it("accepts an event with no price", () => {
    expect(() =>
      eventSchema.parse({ slug: "e", title: { fr: "T" }, date: "2026-01-01", color: "coral" })
    ).not.toThrow();
  });
  it("accepts an optional localized price", () => {
    const parsed = eventSchema.parse({
      slug: "e",
      title: { fr: "T" },
      date: "2026-01-01",
      color: "coral",
      price: { fr: "Gratuit", en: "Free" },
    });
    expect(parsed.price).toEqual({ fr: "Gratuit", en: "Free" });
  });
});
