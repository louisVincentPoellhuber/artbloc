import { NOISE } from "@/ui/gradient-sphere";

// Non-interactive backdrop for the colored bands: a multi-stop gradient, a couple
// of soft blurred accent shapes, and a film-grain overlay — matching the design
// references in docs/wireframes/bg/. One variant per surface color.
const VARIANTS = {
  olive: {
    gradient: "radial-gradient(115% 95% at 26% 20%, #6f7d54 0%, #586744 52%, #454f31 100%)",
    shapes: [
      { color: "#8a9a5b", cls: "left-[-14%] top-[-20%] h-[60%] w-[46%]" },
      { color: "#d57278", cls: "right-[-12%] bottom-[-22%] h-[55%] w-[42%]" },
    ],
  },
  coral: {
    gradient: "radial-gradient(95% 90% at 80% 88%, #f0b19c 0%, #d57278 44%, #bf636b 100%)",
    shapes: [
      { color: "#5c9899", cls: "left-[-16%] top-[-18%] h-[58%] w-[48%]" },
      { color: "#f5ebd9", cls: "right-[4%] top-[-24%] h-[38%] w-[32%]" },
    ],
  },
  teal: {
    gradient: "radial-gradient(105% 100% at 60% 28%, #5c9899 0%, #4d7b7f 52%, #3d686b 100%)",
    shapes: [
      { color: "#e8998d", cls: "left-[4%] bottom-[-20%] h-[58%] w-[42%]" },
      { color: "#e8998d", cls: "right-[8%] top-[-16%] h-[46%] w-[34%]" },
    ],
  },
};

export default function TexturedBackground({ variant = "coral", className = "" }) {
  const v = VARIANTS[variant] ?? VARIANTS.coral;
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div className="absolute inset-0" style={{ backgroundImage: v.gradient }} />
      {v.shapes.map((s, i) => (
        <div
          key={i}
          className={`absolute rounded-[42%] opacity-40 blur-3xl ${s.cls}`}
          style={{ background: s.color }}
        />
      ))}
      <div
        className="absolute inset-0 opacity-[0.12] mix-blend-overlay"
        style={{ backgroundImage: NOISE }}
      />
    </div>
  );
}
