import { useTranslations } from "next-intl";

// Vertical (9:16) embed for the artist interview shorts. Capped narrow so the
// portrait video doesn't dominate the page.
export default function InterviewEmbed({ youtubeId }) {
  const t = useTranslations("artist");
  if (!youtubeId) return null;
  return (
    <div className="mx-auto w-full max-w-xs px-6">
      <div className="aspect-[9/16] w-full overflow-hidden rounded-2xl bg-ink">
        <iframe
          className="h-full w-full"
          src={`https://www.youtube.com/embed/${youtubeId}`}
          title={t("interviewTitle")}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}
