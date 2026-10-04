// Gallery items are usually images, but a few are short looping clips (an
// animated piece converted from GIF). We tell them apart by extension so the
// same images array can carry both.
export function isVideo(src) {
  return typeof src === "string" && /\.(mp4|webm|mov)$/i.test(src);
}

// Paired encodes live side by side (foo.mp4 + foo.webm); given one, derive the
// webm so <video> can offer both sources.
export function webmFor(src) {
  return src.replace(/\.(mp4|mov)$/i, ".webm");
}
