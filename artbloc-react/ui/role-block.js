import TexturedBackground from "@/ui/textured-background";

// Teal "their role at Art Bloc" block for team members. Rendered only when the
// person has a team record with a roleDescription.
export default function RoleBlock({ heading, role, description }) {
  if (!description) return null;
  return (
    <section className="relative w-full overflow-hidden bg-teal px-6 py-14 text-cream">
      <TexturedBackground variant="teal" />
      <div className="relative z-10 mx-auto max-w-3xl">
        <p className="text-xs font-semibold tracking-[0.12em] uppercase text-cream/70">{heading}</p>
        <h2 className="mt-1 font-display text-3xl font-semibold md:text-4xl">{role}</h2>
        <p className="mt-4 text-lg leading-relaxed">{description}</p>
      </div>
    </section>
  );
}
