export default function PageTitle({ children }) {
  return (
    <h1 className="px-6 pt-32 text-5xl font-semibold md:text-7xl">
      {children} <span className="text-coral">▪</span>
    </h1>
  );
}
