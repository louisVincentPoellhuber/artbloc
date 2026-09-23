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
} from "@/lib/content";

describe("content loader", () => {
  it("lists artist slugs", () => {
    expect(getAllArtistSlugs()).toContain("louis-vincent-poellhuber");
  });

  it("returns a locale-resolved artist (no locale maps leak through)", () => {
    const artist = getArtist("louis-vincent-poellhuber", "en");
    expect(artist.blocks[0].text).toBe(
      "Louis celebrates curiosity and the discovery of everyday life through pixels."
    );
    expect(typeof artist.blocks[0].text).toBe("string");
  });

  it("resolves the French locale for content text", () => {
    const artist = getArtist("louis-vincent-poellhuber", "fr");
    expect(artist.blocks[0].text).toBe(
      "Louis célèbre la curiosité et la découverte de la vie de tous les jours à travers les pixels."
    );
  });

  it("returns null for an unknown artist", () => {
    expect(getArtist("nobody", "fr")).toBeNull();
  });

  it("resolves mediums to plain strings for the active locale", () => {
    const fr = getArtist("louis-vincent-poellhuber", "fr");
    const en = getArtist("louis-vincent-poellhuber", "en");
    expect(fr.mediums).toContain("Guitare");
    expect(en.mediums).toContain("Guitar");
    expect(typeof fr.mediums[0]).toBe("string");
  });

  it("derives the artist color from the most recent event", () => {
    expect(getArtistColor("louis-vincent-poellhuber")).toBe("coral");
  });

  it("filters events by status and localizes them", () => {
    const past = getEventsByStatus("past", "en");
    expect(past.map((e) => e.title)).toContain("Fragments of Us");
  });

  it("loads localized site config", () => {
    expect(getSite("fr").contact.email).toBe("artbloc@outlook.com");
  });

  it("loads all ten artists", () => {
    expect(getAllArtists("fr").length).toBe(10);
  });

  it("derives teal for an artist only in the 2025 event", () => {
    expect(getArtistColor("nancy-zhu")).toBe("teal");
  });

  it("derives coral for an artist in the 2026 event", () => {
    expect(getArtistColor("jennie-ming")).toBe("coral");
  });

  it("falls back to coral for an artist in no event", () => {
    expect(getArtistColor("tian-su-zhong")).toBe("coral");
  });

  it("lists all event slugs", () => {
    expect(getAllEventSlugs()).toEqual(
      expect.arrayContaining(["fragments-de-nous", "frontieres-poreuses"])
    );
  });

  it("resolves an event's artists to slug, name and avatar", () => {
    const event = getEvent("frontieres-poreuses", "fr");
    const artists = getEventArtists(event, "fr");
    expect(artists.map((a) => a.slug)).toContain("louis-vincent-poellhuber");
    expect(artists[0]).toHaveProperty("name");
    expect(artists[0]).toHaveProperty("avatar");
  });

  it("loads six team members across two groups", () => {
    const team = getTeam("fr");
    expect(team.length).toBe(6);
    expect(team.filter((m) => m.group === "exec").length).toBe(4);
    expect(team.filter((m) => m.group === "satellite").length).toBe(2);
  });
});
