import { describe, it, expect } from "vitest";
import { getArtistsByYear, getAllArtistSlugs } from "@/lib/content";

describe("getArtistsByYear", () => {
  it("groups artists under the year of the event they showed in", () => {
    const groups = getArtistsByYear("fr");
    expect(groups.length).toBeGreaterThan(0);
    for (const group of groups) {
      expect(Number.isInteger(group.year)).toBe(true);
      expect(group.artists.length).toBeGreaterThan(0);
    }
  });

  it("orders the years newest first", () => {
    const years = getArtistsByYear("fr").map((g) => g.year);
    expect(years).toEqual([...years].sort((a, b) => b - a));
  });

  it("leaves out anyone who has a page but has never shown work", () => {
    // Staff keep an artist page so their About card can link somewhere, but
    // they are not in any event roster and must not appear in the list.
    const listed = new Set(getArtistsByYear("fr").flatMap((g) => g.artists.map((a) => a.slug)));
    const everyone = getAllArtistSlugs();
    const excluded = everyone.filter((slug) => !listed.has(slug));

    expect(listed.size).toBeGreaterThan(0);
    expect(excluded.length).toBeGreaterThan(0);
    expect(listed.size + excluded.length).toBe(everyone.length);
  });

  it("resolves each artist for the requested locale", () => {
    const fr = getArtistsByYear("fr")[0].artists[0];
    expect(typeof fr.name).toBe("string");
    // mediums are locale maps in content and must arrive resolved.
    if (fr.mediums.length) expect(typeof fr.mediums[0]).toBe("string");
  });

  it("never lists the same artist twice within one year", () => {
    for (const group of getArtistsByYear("fr")) {
      const slugs = group.artists.map((a) => a.slug);
      expect(new Set(slugs).size).toBe(slugs.length);
    }
  });
});

describe("team photos", () => {
  it("uses the artist page's image when that page supplies one", async () => {
    const { getTeam } = await import("@/lib/content");
    const team = getTeam("fr");
    const withHeadshot = team.filter((m) => m.photo !== "/ABHomeLogo.png");
    // Several of the team have real headshots on their artist pages; those must
    // reach the About grid rather than the placeholder sitting on the team file.
    expect(withHeadshot.length).toBeGreaterThan(0);
    for (const m of withHeadshot) expect(m.photo).toMatch(/^\/artists\//);
  });

  it("keeps the team photo when the artist page has no image of its own", async () => {
    const { getTeam, getArtist } = await import("@/lib/content");
    for (const m of getTeam("fr")) {
      const artistAvatar = getArtist(m.slug, "fr")?.avatar;
      if (!artistAvatar || artistAvatar === "/ABHomeLogo.png") {
        expect(m.photo).toBe("/ABHomeLogo.png");
      }
    }
  });
});
