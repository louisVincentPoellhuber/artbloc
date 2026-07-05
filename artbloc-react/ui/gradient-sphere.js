// Shared film-grain overlay. The SVG filter id lives inside the data-URI
// document, so there are no cross-instance id collisions on the page.
export const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

// A lit, bounded coral orb: highlight upper-left → deeper coral at the rim,
// grounded by a drop shadow and rim shading. Size/position come from `className`.
// `blurred` renders a soft, unlabelled depth orb that sits behind the others.
export default function GradientSphere({ label, className = "", blurred = false }) {
  return (
    <div
      className={`group relative flex items-center justify-center rounded-full ${
        blurred ? "blur-xl" : ""
      } ${className}`}
      style={{
        backgroundImage:
          "radial-gradient(circle at 34% 28%, #f4c7bb 0%, #e0968c 34%, #cf7076 66%, #b95a63 100%)",
        boxShadow: blurred
          ? "none"
          : "0 22px 45px -14px rgba(44,36,33,0.5), inset 0 -12px 24px -8px rgba(120,40,50,0.55), inset 0 10px 18px -8px rgba(255,235,225,0.7)",
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full opacity-25 mix-blend-soft-light"
        style={{ backgroundImage: NOISE }}
      />
      {label ? (
        <span className="relative z-10 px-2 text-center font-display text-sm text-cream drop-shadow md:text-base">
          {label}
        </span>
      ) : null}
    </div>
  );
}
