import { useCatalogStore } from "@/stores/catalog-store";

const MATERIALS = ["Chrome", "Gunmetal", "White Chrome", "Rose Gold", "Stainless Steel",'Matte Black'];
const TYPES = ["Adjustable", "Fixed"];

function Checkbox({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className="shrink-0 flex items-center justify-center rounded-[4px] transition-colors"
      style={{
        width: 18,
        height: 18,
        border: checked ? "1.5px solid #1a1a1a" : "1.5px solid #e5e5e5",
        background: checked ? "#1a1a1a" : "#ffffff",
      }}
      aria-checked={checked}
      role="checkbox"
    >
      {checked && (
        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
          <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      className="relative shrink-0 transition-colors rounded-full"
      style={{
        width: 38,
        height: 22,
        background: on ? "#1a1a1a" : "#e5e5e5",
      }}
    >
      <span
        className="absolute top-[3px] rounded-full bg-white transition-transform"
        style={{
          width: 16,
          height: 16,
          transform: on ? "translateX(19px)" : "translateX(3px)",
        }}
      />
    </button>
  );
}

export function FilterPanel() {
  const {
    selectedMaterials,
    selectedTypes,
    inStockOnly,
    searchQuery,
    toggleMaterial,
    toggleType,
    setInStockOnly,
    setSearchQuery,
    clearFilters,
  } = useCatalogStore();

  const hasActiveFilters =
    selectedMaterials.length > 0 || selectedTypes.length > 0 || inStockOnly || searchQuery !== "";

  return (
    <div
      className="flex flex-col bg-white border border-[#e5e5e5] rounded-[12px] p-[20px] shrink-0"
      style={{ width: 280, gap: 24 }}
    >
      {/* Panel Header */}
      <div className="flex items-center justify-between">
        <span className="text-[16px] font-semibold text-[#1a1a1a]">Filters</span>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="text-[13px] font-medium text-[#6b7280] hover:text-[#1a1a1a] transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Search */}
      <div
        className="flex items-center border border-[#e5e5e5] rounded-[8px] px-[12px] py-[10px]"
        style={{ background: "#f9f9f8" }}
      >
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search razors"
          className="w-full bg-transparent text-[14px] font-normal text-[#1a1a1a] placeholder:text-[#6b7280] outline-none"
        />
      </div>

      {/* Material Group */}
      <div className="flex flex-col" style={{ gap: 12 }}>
        <span
          className="text-[12px] font-semibold text-[#6b7280] uppercase"
          style={{ letterSpacing: "0.72px" }}
        >
          Material
        </span>
        <div className="flex flex-col" style={{ gap: 12 }}>
          {MATERIALS.map((material) => (
            <label
              key={material}
              className="flex items-center cursor-pointer"
              style={{ gap: 10 }}
            >
              <Checkbox
                checked={selectedMaterials.includes(material)}
                onChange={() => toggleMaterial(material)}
              />
              <span className="text-[14px] font-normal text-[#1a1a1a]">{material}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Type Group */}
      <div className="flex flex-col" style={{ gap: 12 }}>
        <span
          className="text-[12px] font-semibold text-[#6b7280] uppercase"
          style={{ letterSpacing: "0.72px" }}
        >
          Type
        </span>
        <div className="flex flex-col" style={{ gap: 12 }}>
          {TYPES.map((type) => (
            <label
              key={type}
              className="flex items-center cursor-pointer"
              style={{ gap: 10 }}
            >
              <Checkbox
                checked={selectedTypes.includes(type)}
                onChange={() => toggleType(type)}
              />
              <span className="text-[14px] font-normal text-[#1a1a1a]">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* In Stock Toggle */}
      <div className="flex items-center justify-between">
        <span className="text-[14px] font-normal text-[#1a1a1a]">In stock only</span>
        <Toggle on={inStockOnly} onChange={setInStockOnly} />
      </div>
    </div>
  );
}
