import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import {
  artistSchema,
  eventSchema,
  teamSchema,
  siteSchema,
} from "@/lib/schemas";
import { deepLocalize } from "@/lib/localize";
import { deriveArtistColor } from "@/lib/colors";
import { eventStatus } from "@/lib/events";

const CONTENT_DIR = path.join(process.cwd(), "content");
const PUBLIC_DIR = path.join(process.cwd(), "public");
const IMAGE_RE = /\.(jpe?g|png|webp|avif|gif)$/i;

function readJson(...segments) {
  return JSON.parse(readFileSync(path.join(CONTENT_DIR, ...segments), "utf8"));
}

// Expand a folder under public/ into a sorted list of web-root image paths.
// Lets site.json point slideshow at a folder instead of listing every file.
function listPublicImages(dir) {
  try {
    return readdirSync(path.join(PUBLIC_DIR, dir))
      .filter((file) => IMAGE_RE.test(file))
      .sort()
      .map((file) => `/${dir}/${file}`);
  } catch {
    return [];
  }
}

function listSlugs(dir) {
  return readdirSync(path.join(CONTENT_DIR, dir))
    .filter((file) => file.endsWith(".json"))
    .map((file) => file.replace(/\.json$/, ""));
}

function loadAllRawEvents() {
  return listSlugs("events").map((slug) =>
    eventSchema.parse(readJson("events", `${slug}.json`))
  );
}

export function getAllArtistSlugs() {
  return listSlugs("artists");
}

export function getArtist(slug, locale) {
  let raw;
  try {
    raw = readJson("artists", `${slug}.json`);
  } catch {
    return null;
  }
  const artist = artistSchema.parse(raw);
  // headshot wins, then the first artwork, then any explicit avatar, then a fallback.
  const avatar = artist.headshot ?? artist.images[0]?.src ?? artist.avatar ?? "/ABHomeLogo.png";
  return deepLocalize({ ...artist, avatar }, locale);
}

export function getAllArtists(locale) {
  return getAllArtistSlugs().map((slug) => getArtist(slug, locale));
}

export function getArtistColor(slug) {
  return deriveArtistColor(slug, loadAllRawEvents());
}

/**
 * Artists grouped by the year of the event they showed in, newest year first.
 *
 * The event rosters are the only record of who exhibited and when, so the year
 * is derived rather than stored (see D7 — there is no Edition entity). This
 * also decides who counts as an artist: anyone in no roster, such as staff who
 * have a page but have never shown work, appears under no year and so is
 * absent from the list. Someone who showed in two years appears under both.
 */
export function getArtistsByYear(locale) {
  const byYear = new Map();
  for (const event of loadAllRawEvents()) {
    const year = new Date(event.date).getFullYear();
    const slugs = byYear.get(year) ?? [];
    for (const slug of event.artists ?? []) {
      if (!slugs.includes(slug)) slugs.push(slug);
    }
    byYear.set(year, slugs);
  }

  return [...byYear.entries()]
    .sort((a, b) => b[0] - a[0])
    .map(([year, slugs]) => ({
      year,
      artists: slugs.map((slug) => getArtist(slug, locale)).filter(Boolean),
    }))
    .filter((group) => group.artists.length > 0);
}

export function getEvent(slug, locale) {
  let raw;
  try {
    raw = readJson("events", `${slug}.json`);
  } catch {
    return null;
  }
  return deepLocalize(eventSchema.parse(raw), locale);
}

export function getAllEvents(locale) {
  return loadAllRawEvents().map((event) => deepLocalize(event, locale));
}

export function getEventsByStatus(status, locale) {
  return getAllEvents(locale).filter((event) => eventStatus(event) === status);
}

export function getAllEventSlugs() {
  return listSlugs("events");
}

export function getEventArtists(event, locale) {
  return (event.artists ?? [])
    .map((slug) => getArtist(slug, locale))
    .filter(Boolean)
    .map((artist) => ({ slug: artist.slug, name: artist.name, avatar: artist.avatar }));
}

const FALLBACK_AVATAR = "/ABHomeLogo.png";

/**
 * Most of the team also have an artist page, and that page is where real
 * headshots get maintained. Share its image rather than keeping a second copy
 * on the team file, which drifts the moment one is updated and the other is
 * not. The team photo still wins if the artist page has no image of its own.
 */
function withArtistPhoto(member, locale) {
  const fromArtist = getArtist(member.slug, locale)?.avatar;
  const usable = fromArtist && fromArtist !== FALLBACK_AVATAR;
  return usable ? { ...member, photo: fromArtist } : member;
}

export function getTeam(locale) {
  return listSlugs("team").map((slug) =>
    withArtistPhoto(deepLocalize(teamSchema.parse(readJson("team", `${slug}.json`)), locale), locale)
  );
}

export function getTeamMember(slug, locale) {
  try {
    const raw = readJson("team", `${slug}.json`);
    return withArtistPhoto(deepLocalize(teamSchema.parse(raw), locale), locale);
  } catch {
    return null;
  }
}

export function getSite(locale) {
  const site = deepLocalize(siteSchema.parse(readJson("site.json")), locale);
  // slideshow may be a folder name (expanded here) or an explicit list.
  if (typeof site.slideshow === "string") {
    site.slideshow = listPublicImages(site.slideshow);
  }
  return site;
}
