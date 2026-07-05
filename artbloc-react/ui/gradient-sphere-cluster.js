import GradientSphere from "@/ui/gradient-sphere";

// Labelled category orbs — varied size, default blur and grain so the cluster
// reads with depth. Each sharpens and reveals its label on hover. Positions are
// tuned to cluster together and stay within bounds (the section clips overflow).
const SLOTS = [
  { pos: "left-[28%] top-[12%]", size: "size-[clamp(8rem,17vw,15rem)]", blur: "blur-sm", noise: 0.18 },
  { pos: "left-[2%] top-[4%]", size: "size-[clamp(5.5rem,11vw,10rem)]", blur: "blur-md", noise: 0.24 },
  { pos: "left-[70%] top-[2%]", size: "size-[clamp(4.5rem,9vw,8rem)]", blur: "blur-lg", noise: 0.3 },
  { pos: "left-[4%] top-[52%]", size: "size-[clamp(6.5rem,13vw,12rem)]", blur: "blur", noise: 0.26 },
  { pos: "left-[58%] top-[46%]", size: "size-[clamp(6rem,12vw,11rem)]", blur: "blur-sm", noise: 0.2 },
  { pos: "left-[32%] top-[64%]", size: "size-[clamp(5rem,10vw,9rem)]", blur: "blur-md", noise: 0.24 },
  { pos: "left-[78%] top-[42%]", size: "size-[clamp(3.5rem,7vw,6rem)]", blur: "blur-lg", noise: 0.34 },
];

// Small, heavily blurred orbs sit behind for depth-of-field (no labels).
const BACK = [
  { pos: "left-[50%] top-[6%]", size: "size-[clamp(2.5rem,5vw,4rem)]", blur: "blur-xl", noise: 0.12 },
  { pos: "left-[20%] top-[34%]", size: "size-[clamp(2rem,4vw,3.5rem)]", blur: "blur-2xl", noise: 0.12 },
  { pos: "left-[68%] top-[70%]", size: "size-[clamp(3rem,6vw,5rem)]", blur: "blur-2xl", noise: 0.12 },
];

export default function GradientSphereCluster({ labels }) {
  const shown = labels.slice(0, SLOTS.length);
  return (
    <div className="relative h-[clamp(24rem,44vw,34rem)] w-full">
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
