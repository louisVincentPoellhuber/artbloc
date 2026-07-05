import Slideshow from "@/ui/slideshow";

export default function HomeHero({ images, tagline }) {
  return (
    <header className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
      <div className="absolute inset-0 scale-105 blur-sm">
        <Slideshow images={images} />
      </div>
      <div className="absolute inset-0 bg-ink/40" />
      <div className="relative z-10 px-6 text-center text-cream">
        <h1 className="font-display text-7xl font-bold tracking-tight md:text-9xl">ART BLOC</h1>
        <p className="mt-4 text-lg md:text-xl">{tagline}</p>
      </div>
    </header>
  );
}
