import GradientSphere from "@/ui/gradient-sphere";

// Labelled category orbs — varied size, default blur and grain so the cluster
// reads with depth. Each sharpens and reveals its label on hover. Positions are
// tuned to cluster together and stay within bounds (the section clips overflow).
const SLOTS = [
  { pos: "left-[2%] top-[4%]", size: "h-24 w-24", blur: "blur-md", noise: 0.24 },
  { pos: "left-[36%] top-[15%]", size: "h-44 w-44", blur: "blur-sm", noise: 0.18 },
  { pos: "left-[75%] top-[2%]", size: "h-20 w-20", blur: "blur-lg", noise: 0.3 },
  { pos: "left-[7%] top-[46%]", size: "h-28 w-28", blur: "blur", noise: 0.26 },
  { pos: "left-[60%] top-[48%]", size: "h-32 w-32", blur: "blur-sm", noise: 0.2 },
  { pos: "left-[30%] top-[66%]", size: "h-24 w-24", blur: "blur-md", noise: 0.24 },
  { pos: "left-[82%] top-[40%]", size: "h-16 w-16", blur: "blur-lg", noise: 0.34 },
];

// Small, heavily blurred orbs sit behind for depth-of-field (no labels).
const BACK = [
  { pos: "left-[52%] top-[8%]", size: "h-12 w-12", blur: "blur-xl", noise: 0.12 },
  { pos: "left-[24%] top-[32%]", size: "h-10 w-10", blur: "blur-2xl", noise: 0.12 },
  { pos: "left-[70%] top-[72%]", size: "h-16 w-16", blur: "blur-2xl", noise: 0.12 },
];

export default function GradientSphereCluster({ labels }) {
  const shown = labels.slice(0, SLOTS.length);
  return (
    <div className="relative mx-auto h-[26rem] w-full max-w-md">
      {BACK.map((b, i) => (
        <div key={`b${i}`} className={`absolute ${b.pos}`}>
          <GradientSphere className={b.size} blur={b.blur} noise={b.noise} />
        </div>
      ))}
      {shown.map((label, i) => (
        <div key={i} className={`absolute ${SLOTS[i].pos}`}>
          <GradientSphere
            label={label}
            className={SLOTS[i].size}
            blur={SLOTS[i].blur}
            noise={SLOTS[i].noise}
          />
        </div>
      ))}
    </div>
  );
}
