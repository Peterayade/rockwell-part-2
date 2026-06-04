import { useCatalogStore } from "@/stores/catalog-store";

function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <div className="flex items-center rounded-[999px] px-[10px] py-[6px]" style={{ background: "#efefee", gap: 6 }}>
      <span className="text-[13px] font-medium text-[#1a1a1a]">{label}</span>
      <button
        type="button"
        onClick={onRemove}
        className="text-[11px] font-normal text-[#6b7280] leading-none hover:text-[#1a1a1a] transition-colors"
        aria-label={`Remove ${label} filter`}
      >
        ✕
      </button>
    </div>
  );
}

export function ActiveFilters() {
  const { selectedMaterials, selectedTypes, inStockOnly, removeFilter } = useCatalogStore();

  const hasFilters = selectedMaterials.length > 0 || selectedTypes.length > 0 || inStockOnly;
  if (!hasFilters) return null;

  return (
    <div className="flex flex-wrap" style={{ gap: 8 }}>
      {selectedMaterials.map((material) => (
        <Chip
          key={material}
          label={material}
          onRemove={() => removeFilter("material", material)}
        />
      ))}
      {selectedTypes.map((type) => (
        <Chip
          key={type}
          label={type}
          onRemove={() => removeFilter("type", type)}
        />
      ))}
      {inStockOnly && (
        <Chip label="In stock" onRemove={() => removeFilter("inStock")} />
      )}
    </div>
  );
}
