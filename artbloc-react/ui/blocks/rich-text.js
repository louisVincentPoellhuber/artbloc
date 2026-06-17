export default function RichText({ text, variant = "body" }) {
  const size =
    variant === "lead"
      ? "text-2xl leading-snug text-ink md:text-3xl"
      : "text-lg leading-relaxed text-ink/80";
  return <div className={`mx-auto w-full max-w-3xl px-6 ${size}`}>{text}</div>;
}
