import { useCatalogStore, RAZORS } from "@/stores/catalog-store";
import { FilterPanel } from "@/components/FilterPanel";
import { ActiveFilters } from "@/components/ActiveFilters";
import { ProductGrid } from "@/components/ProductGrid";

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name", label: "Name" },
];

export default function App() {
  const { selectedMaterials, selectedTypes, inStockOnly, searchQuery, sortBy, setSortBy } =
    useCatalogStore();

  const filtered = RAZORS.filter((razor) => {
    if (selectedMaterials.length > 0 && !selectedMaterials.includes(razor.material)) return false;
    if (selectedTypes.length > 0 && !selectedTypes.includes(razor.type)) return false;
    if (inStockOnly && !razor.inStock) return false;
    if (searchQuery && !razor.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return 0;
  });

  const sortLabel = SORT_OPTIONS.find((o) => o.value === sortBy)?.label ?? "Featured";

  return (
    <div className="min-h-screen p-[32px]" style={{ background: "#f5f5f4" }}>
      <div className="flex flex-col" style={{ gap: 24 }}>
        {/* Header */}
        <div className="flex flex-col" style={{ gap: 6 }}>
          <h1 className="text-[22px] font-semibold text-[#1a1a1a] leading-[28px]">Shop Razors</h1>
          <p className="text-[14px] font-normal text-[#6b7280] leading-[20px]">
            Precision-engineered safety razors. Filter to find your setting.
          </p>
        </div>

        {/* Body */}
        <div className="flex items-start" style={{ gap: 32 }}>
          {/* Left — Filter Panel */}
          <FilterPanel />

          {/* Right — Results */}
          <div className="flex flex-col flex-1 min-w-0" style={{ gap: 16 }}>
            {/* Toolbar */}
            <div className="flex items-center justify-between">
              <span className="text-[15px] font-semibold text-[#1a1a1a]">
                {sorted.length} {sorted.length === 1 ? "razor" : "razors"}
              </span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-[#e5e5e5] rounded-[8px] px-[12px] py-[8px] pr-[28px] text-[13px] font-medium text-[#1a1a1a] cursor-pointer outline-none"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-[10px] top-1/2 -translate-y-1/2 text-[12px] text-[#6b7280]">
                  ▾
                </span>
              </div>
            </div>

            {/* Active Filter Chips */}
            <ActiveFilters />

            {/* Product Grid */}
            <ProductGrid razors={sorted} />
          </div>
        </div>
      </div>
    </div>
  );
}
