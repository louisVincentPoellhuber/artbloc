export default function RichText({ text, variant = "body" }) {
  const size = variant === "lead" ? "text-2xl md:text-3xl" : "text-lg md:text-xl";
  return (
    <div className={`mx-auto w-full max-w-3xl px-6 leading-relaxed ${size}`}>
      {text}
    </div>
  );
}
