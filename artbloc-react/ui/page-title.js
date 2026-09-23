export default function PageTitle({ children }) {
  return (
    <h1 className="px-6 pt-24 font-display text-4xl font-semibold tracking-tight text-ink md:pt-32 md:text-6xl lg:text-8xl">
      {children}
      <span className="ml-2 align-middle text-coral">▪</span>
    </h1>
  );
}
