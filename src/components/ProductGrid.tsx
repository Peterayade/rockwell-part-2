import type { Razor } from "@/stores/catalog-store";
import { RazorCard } from "./RazorCard";

interface ProductGridProps {
  razors: Razor[];
}

export function ProductGrid({ razors }: ProductGridProps) {
  if (razors.length === 0) {
    return (
      <div className="flex items-center justify-center py-16">
        <span className="text-[14px] font-normal text-[#6b7280]">No razors match your filters.</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2" style={{ gap: 16 }}>
      {razors.map((razor) => (
        <RazorCard key={razor.id} razor={razor} />
      ))}
    </div>
  );
}
