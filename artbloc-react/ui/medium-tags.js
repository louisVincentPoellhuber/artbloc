export default function MediumTags({ tags = [] }) {
  return (
    <div className="px-6 pt-4 text-sm font-medium tracking-wide text-ink/55 uppercase">
      {tags.join(" • ")}
    </div>
  );
}
