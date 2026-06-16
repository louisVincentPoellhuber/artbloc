import { registry } from "@/ui/blocks/registry";

export default function Blocks({ blocks = [] }) {
  return (
    <div className="flex flex-col gap-16">
      {blocks.map((block, index) => {
        const Component = registry[block.type];
        if (!Component) {
          throw new Error(`Unknown block type: "${block.type}"`);
        }
        return <Component key={index} {...block} />;
      })}
    </div>
  );
}
