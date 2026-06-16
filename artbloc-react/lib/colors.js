export function deriveArtistColor(slug, events, fallback = "coral") {
  const appearances = events.filter((event) => event.artists?.includes(slug));
  if (appearances.length === 0) {
    return fallback;
  }
  const latest = appearances.reduce((a, b) =>
    new Date(a.date) >= new Date(b.date) ? a : b
  );
  return latest.color;
}
