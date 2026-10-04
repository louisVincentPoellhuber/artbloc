// Socials row shown at the top of an artist page. Instagram is stored as a
// bare handle and expanded to a URL here; website/etsy are full URLs; email
// becomes a mailto. Anything absent is simply skipped.
function instagramUrl(handle) {
  const h = handle.replace(/^@/, "");
  return `https://instagram.com/${h}`;
}

export default function Socials({ socials }) {
  if (!socials) return null;
  const links = [];
  if (socials.instagram)
    links.push({ label: `@${socials.instagram.replace(/^@/, "")}`, href: instagramUrl(socials.instagram) });
  if (socials.website)
    links.push({ label: socials.website.replace(/^https?:\/\//, "").replace(/\/$/, ""), href: socials.website });
  if (socials.etsy) links.push({ label: "Etsy", href: socials.etsy });
  if (socials.email) links.push({ label: socials.email, href: `mailto:${socials.email}` });
  for (const extra of socials.otherLinks ?? []) links.push({ label: extra.label, href: extra.url });

  if (links.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 px-6 pt-4">
      {links.map((l) => (
        <a
          key={l.href}
          href={l.href}
          target={l.href.startsWith("mailto:") ? undefined : "_blank"}
          rel="noreferrer"
          className="rounded-full border border-ink/15 bg-cream px-4 py-2 text-sm font-medium text-ink transition hover:bg-ink hover:text-cream"
        >
          {l.label}
        </a>
      ))}
    </div>
  );
}
