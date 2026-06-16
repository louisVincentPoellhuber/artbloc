export default function MediumTags({ tags = [] }) {
  return (
    <div className="px-6 pt-4 text-lg text-ink/60">{tags.join(" • ")}</div>
  );
}
