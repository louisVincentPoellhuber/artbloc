import Image from "next/image";
import { Link } from "@/i18n/navigation";

export default function ArtistAvatar({ slug, name, avatar }) {
  return (
    <Link href={`/artists/${slug}`} className="group flex w-24 flex-col items-center gap-2 text-center">
      <Image
        src={avatar}
        alt={name}
        width={120}
        height={120}
        className="aspect-square w-24 rounded-full object-cover ring-2 ring-ink/10 transition motion-safe:group-hover:scale-105"
      />
      <span className="text-sm font-medium text-ink/80">{name}</span>
    </Link>
  );
}
