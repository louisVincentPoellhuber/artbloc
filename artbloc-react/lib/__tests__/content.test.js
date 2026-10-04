import { describe, it, expect } from "vitest";
import {
  getAllArtistSlugs,
  getAllArtists,
  getAllEventSlugs,
  getArtist,
  getArtistColor,
  getEvent,
  getEventArtists,
  getEventsByStatus,
  getSite,
  getTeam,
  getTeamMember,
} from "@/lib/content";

describe("content loader", () => {
  it("lists artist slugs", () => {
    expect(getAllArtistSlugs()).toContain("louis-vincent-poellhuber");
  });

  it("returns a locale-resolved artist (no locale maps leak through)", () => {
    const artist = getArtist("maya-wou", "en");
    expect(typeof artist.statement).toBe("string");
    expect(artist.statement).toContain("Through oil painting");
  });

  it("resolves the French locale for content text", () => {
    const artist = getArtist("maya-wou", "fr");
    expect(typeof artist.statement).toBe("string");
    expect(artist.statement).toContain("peinture à l'huile");
  });

  it("returns null for an unknown artist", () => {
    expect(getArtist("nobody", "fr")).toBeNull();
  });

  it("resolves mediums to plain strings for the active locale", () => {
    const fr = getArtist("maya-wou", "fr");
    const en = getArtist("maya-wou", "en");
    expect(fr.mediums).toContain("Peintre");
    expect(en.mediums).toContain("Painter");
    expect(typeof fr.mediums[0]).toBe("string");
  });

  // The color-derivation *logic* (most-recent-event-wins, fallback) is covered
  // directly in colors.test.js with synthetic data. Here we only check the
  // integration: real content resolves to a valid palette token.
  it("derives a valid palette color for every artist", () => {
    const tokens = getAllArtistSlugs().map((slug) => getArtistColor(slug));
    expect(tokens.length).toBeGreaterThan(0);
    expect(tokens.every((c) => c === "coral" || c === "teal")).toBe(true);
  });

  it("falls back to coral for an artist in no event", () => {
    expect(getArtistColor("definitely-not-an-artist")).toBe("coral");
  });

  it("filters events by status and localizes them", () => {
    const past = getEventsByStatus("past", "en");
    expect(past.map((e) => e.title)).toContain("Fragments of Us");
  });

  it("loads localized site config", () => {
    expect(getSite("fr").contact.email).toBe("artbloc@outlook.com");
  });

  it("expands the slideshow folder into sorted image paths", () => {
    const { slideshow } = getSite("fr");
    expect(Array.isArray(slideshow)).toBe(true);
    expect(slideshow.length).toBeGreaterThan(0);
    expect(slideshow.every((src) => src.startsWith("/slideshow/"))).toBe(true);
    expect([...slideshow].sort()).toEqual(slideshow);
  });

  it("loads one artist per file, each with a slug and name", () => {
    const artists = getAllArtists("fr");
    expect(artists.length).toBe(getAllArtistSlugs().length);
    expect(artists.length).toBeGreaterThan(0);
    expect(artists.every((a) => a.slug && a.name)).toBe(true);
  });

  it("lists all event slugs", () => {
    expect(getAllEventSlugs()).toEqual(
      expect.arrayContaining(["fragments-de-nous", "frontieres-poreuses"])
    );
  });

  it("resolves an event's artists to slug, name and avatar", () => {
    // Use whichever event actually lists artists, rather than a fixed slug.
    const slug = getAllEventSlugs().find((s) => getEvent(s, "fr").artists.length > 0);
    const event = getEvent(slug, "fr");
    const artists = getEventArtists(event, "fr");
    expect(artists.length).toBeGreaterThan(0);
    // Every resolved artist is one the event listed.
    expect(event.artists).toEqual(expect.arrayContaining(artists.map((a) => a.slug)));
    for (const a of artists) {
      expect(a).toHaveProperty("name");
      expect(a).toHaveProperty("avatar");
    }
  });

  it("loads the team split across valid groups", () => {
    const team = getTeam("fr");
    expect(team.length).toBeGreaterThan(0);
    const grouped = team.filter((m) => m.group === "exec" || m.group === "satellite");
    // Every member falls into one of the two known groups.
    expect(grouped.length).toBe(team.length);
  });
});

describe("getTeamMember", () => {
  it("returns a localized team record by slug", () => {
    const m = getTeamMember("nancy-zhu", "fr");
    expect(m.slug).toBe("nancy-zhu");
    expect(typeof m.role).toBe("string");
  });

  it("returns null for a non-team slug", () => {
    expect(getTeamMember("not-a-member", "fr")).toBeNull();
  });
});

describe("effective avatar", () => {
  it("prefers the headshot when present", () => {
    const louis = getArtist("louis-vincent-poellhuber", "fr");
    expect(louis.avatar).toBe("/artists/louis-vincent-poellhuber/headshot.jpg");
  });

  it("falls back to the first image when there is no headshot", () => {
    // an-laurence has images but no headshot.
    const an = getArtist("an-laurence", "fr");
    expect(an.avatar).toBe("/artists/an-laurence/1.png");
  });
});
