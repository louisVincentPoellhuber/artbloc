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
  return deepLocalize(artist, locale);
}

export function getAllArtists(locale) {
  return getAllArtistSlugs().map((slug) => getArtist(slug, locale));
}

export function getArtistColor(slug) {
  return deriveArtistColor(slug, loadAllRawEvents());
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

export function getTeam(locale) {
  return listSlugs("team").map((slug) =>
    deepLocalize(teamSchema.parse(readJson("team", `${slug}.json`)), locale)
  );
}

export function getSite(locale) {
  const site = deepLocalize(siteSchema.parse(readJson("site.json")), locale);
  // slideshow may be a folder name (expanded here) or an explicit list.
  if (typeof site.slideshow === "string") {
    site.slideshow = listPublicImages(site.slideshow);
  }
  return site;
}
