// Event status is derived from its date, not stored. Because the site is
// statically generated, "now" is build time: an event becomes "past" on the
// next rebuild after its date passes. ISO date strings (YYYY-MM-DD) compare
// correctly as plain strings, which sidesteps timezone math.
export function eventStatus(event, now = new Date()) {
  const today = now.toISOString().slice(0, 10);
  return event.date >= today ? "upcoming" : "past";
}
