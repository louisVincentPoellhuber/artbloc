// Inline SVG noise as a data-URI background (no filter-id collisions between spheres).
const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.25'/%3E%3C/svg%3E\")";

export default function GradientSphere({ label, className = "" }) {
  return (
    <div className={`group relative flex items-center justify-center rounded-full ${className}`}>
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-full blur-md transition-[filter] duration-500 motion-safe:group-hover:blur-none motion-reduce:blur-none"
        style={{
          backgroundImage: `radial-gradient(circle at 35% 30%, #e8998d, #d57278 55%, #b85c62), ${NOISE}`,
        }}
      />
      <span className="relative z-10 px-2 text-center font-display text-sm text-cream md:text-base">
        {label}
      </span>
    </div>
  );
}
