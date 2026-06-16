// A LocalizedString is a plain object shaped like { fr, en } (en optional).
function isLocalized(value) {
  return (
    value !== null &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    "fr" in value &&
    Object.keys(value).every((key) => key === "fr" || key === "en")
  );
}

export function localize(value, locale) {
  return value[locale] ?? value.fr;
}

export function deepLocalize(node, locale) {
  if (Array.isArray(node)) {
    return node.map((item) => deepLocalize(item, locale));
  }
  if (node !== null && typeof node === "object") {
    if (isLocalized(node)) {
      return localize(node, locale);
    }
    const out = {};
    for (const [key, value] of Object.entries(node)) {
      out[key] = deepLocalize(value, locale);
    }
    return out;
  }
  return node;
}
