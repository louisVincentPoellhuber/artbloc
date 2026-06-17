export default function PageTitle({ children }) {
  return (
    <h1 className="px-6 pt-32 font-display text-6xl font-semibold tracking-tight text-ink md:text-8xl">
      {children}
      <span className="ml-2 align-middle text-coral">▪</span>
    </h1>
  );
}
