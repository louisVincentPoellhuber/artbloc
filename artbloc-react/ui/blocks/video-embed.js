export default function VideoEmbed({ id }) {
  return (
    <div className="mx-auto aspect-video w-full max-w-3xl px-6">
      <iframe
        className="h-full w-full"
        src={`https://www.youtube.com/embed/${id}`}
        title="Art Bloc video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
