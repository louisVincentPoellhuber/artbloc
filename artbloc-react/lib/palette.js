// Static class strings only — Tailwind must see complete class names at build time.
const PALETTE = {
  coral: { bg: "bg-coral", text: "text-coral", border: "border-coral" },
  teal: { bg: "bg-teal", text: "text-teal", border: "border-teal" },
};

export function colorClasses(token) {
  return PALETTE[token] ?? PALETTE.coral;
}
