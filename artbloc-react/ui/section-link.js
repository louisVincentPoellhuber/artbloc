import { Link } from "@/i18n/navigation";

export default function SectionLink({ href, label }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 font-display text-xl font-medium underline-offset-4 transition hover:underline md:text-2xl"
    >
      {label}{" "}
      <span aria-hidden="true" className="text-2xl md:text-3xl">
        ›
      </span>
    </Link>
  );
}
