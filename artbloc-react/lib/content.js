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

const CONTENT_DIR = path.join(process.cwd(), "content");

function readJson(...segments) {
  return JSON.parse(readFileSync(path.join(CONTENT_DIR, ...segments), "utf8"));
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
  return getAllEvents(locale).filter((event) => event.status === status);
}

export function getTeam(locale) {
  return listSlugs("team").map((slug) =>
    deepLocalize(teamSchema.parse(readJson("team", `${slug}.json`)), locale)
  );
}

export function getSite(locale) {
  return deepLocalize(siteSchema.parse(readJson("site.json")), locale);
}
