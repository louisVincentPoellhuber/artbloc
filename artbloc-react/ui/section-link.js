import { Link } from "@/i18n/navigation";

export default function SectionLink({ href, label }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1 font-display text-lg opacity-80 transition hover:opacity-100"
    >
      {label} <span aria-hidden="true">›</span>
    </Link>
  );
}
