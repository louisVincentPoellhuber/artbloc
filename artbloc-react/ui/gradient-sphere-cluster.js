import GradientSphere from "@/ui/gradient-sphere";

// Preset sizes/positions for up to 7 category spheres (the Édition cluster).
const POSITIONS = [
  "absolute left-[8%] top-[18%] h-28 w-28",
  "absolute left-[34%] top-[40%] h-40 w-40",
  "absolute left-[64%] top-[8%] h-24 w-24",
  "absolute left-[18%] top-[64%] h-20 w-20",
  "absolute left-[58%] top-[54%] h-32 w-32",
  "absolute left-[80%] top-[38%] h-24 w-24",
  "absolute left-[44%] top-[80%] h-16 w-16",
];

export default function GradientSphereCluster({ labels }) {
  const shown = labels.slice(0, POSITIONS.length);
  return (
    <div className="relative h-96 w-full">
      {shown.map((label, i) => (
        <GradientSphere key={i} label={label} className={POSITIONS[i]} />
      ))}
    </div>
  );
}
