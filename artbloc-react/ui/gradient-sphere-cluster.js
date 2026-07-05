import GradientSphere from "@/ui/gradient-sphere";

// Front orbs carry the category labels; sizes/positions are tuned to cluster
// together and stay within the container bounds (the section also clips overflow).
const SLOTS = [
  { pos: "left-[2%] top-[4%]", size: "h-24 w-24" },
  { pos: "left-[36%] top-[16%]", size: "h-40 w-40" },
  { pos: "left-[74%] top-[2%]", size: "h-20 w-20" },
  { pos: "left-[8%] top-[44%]", size: "h-28 w-28" },
  { pos: "left-[60%] top-[46%]", size: "h-32 w-32" },
  { pos: "left-[30%] top-[64%]", size: "h-24 w-24" },
  { pos: "left-[80%] top-[38%]", size: "h-16 w-16" },
];

// Smaller, blurred orbs sit behind the labelled ones for depth-of-field.
const BACK = [
  { pos: "left-[50%] top-[6%]", size: "h-14 w-14 opacity-70" },
  { pos: "left-[22%] top-[30%]", size: "h-12 w-12 opacity-60" },
  { pos: "left-[68%] top-[70%]", size: "h-20 w-20 opacity-60" },
];

export default function GradientSphereCluster({ labels }) {
  const shown = labels.slice(0, SLOTS.length);
  return (
    <div className="relative mx-auto h-[26rem] w-full max-w-md">
      {BACK.map((b, i) => (
        <div key={`b${i}`} className={`absolute ${b.pos}`}>
          <GradientSphere className={b.size} blurred />
        </div>
      ))}
      {shown.map((label, i) => (
        <div key={i} className={`absolute ${SLOTS[i].pos}`}>
          <GradientSphere label={label} className={SLOTS[i].size} />
        </div>
      ))}
    </div>
  );
}
