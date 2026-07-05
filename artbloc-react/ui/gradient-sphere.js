// Shared film-grain overlay. The SVG filter id lives inside the data-URI
// document, so there are no cross-instance id collisions on the page.
export const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

// Radial fade so both the coral gradient and the grain melt into the background
// at the rim (no hard edge).
const FADE = "radial-gradient(circle at 35% 30%, #000 42%, rgba(0,0,0,0) 80%)";

// A soft coral orb that fades to transparent at the edges. Blurred by default
// (amount + grain vary per orb); hovering sharpens it and reveals the label
// (the art form). Under reduced motion it renders sharp with the label shown.
export default function GradientSphere({ label, className = "", blur = "blur-md", noise = 0.22 }) {
  return (
    <div className={`group relative flex items-center justify-center rounded-full ${className}`}>
      <div
        aria-hidden="true"
        className={`absolute inset-0 rounded-full ${blur} transition-[filter] duration-500 ease-out motion-safe:group-hover:blur-none motion-reduce:blur-none`}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            backgroundImage:
              "radial-gradient(circle at 35% 30%, #f6cabe 0%, #e0968c 34%, #cf7076 62%, rgba(185,90,99,0) 82%)",
          }}
        />
        <div
          className="absolute inset-0 rounded-full mix-blend-soft-light"
          style={{ backgroundImage: NOISE, opacity: noise, maskImage: FADE, WebkitMaskImage: FADE }}
        />
      </div>
      {label ? (
        <span className="relative z-10 px-2 text-center font-display text-sm text-cream opacity-0 drop-shadow transition-opacity duration-300 group-hover:opacity-100 motion-reduce:opacity-100 md:text-base">
          {label}
        </span>
      ) : null}
    </div>
  );
}
