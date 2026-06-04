import { useCatalogStore } from "@/stores/catalog-store";
import type { Razor } from "@/stores/catalog-store";

interface RazorCardProps {
  razor: Razor;
}

export function RazorCard({ razor }: RazorCardProps) {
  const { selectedRazorId, setSelectedRazorId } = useCatalogStore();
  const selected = selectedRazorId === razor.id;

  return (
    <div className="flex flex-col bg-white border border-[#e5e5e5] rounded-[12px] overflow-hidden">
      {/* Image placeholder */}
      <div className="w-full shrink-0" style={{ height: 150, background: "#ececeb" }} />

      {/* Content */}
      <div className="flex flex-col p-[14px]" style={{ gap: 6 }}>
        <span className="text-[15px] font-semibold text-[#1a1a1a] leading-normal">
          {razor.name}
        </span>
        <span className="text-[13px] font-normal text-[#6b7280] leading-normal">
          {razor.material}
        </span>

        {/* Footer */}
        <div className="flex items-center justify-between pt-[4px]">
          <span className="text-[16px] font-semibold text-[#1a1a1a] leading-normal">
            ${razor.price}
          </span>
          <button
            type="button"
            onClick={() => setSelectedRazorId(selected ? "" : razor.id)}
            className="text-[13px] font-medium leading-normal px-[12px] py-[8px] rounded-[8px] transition-colors"
            style={
              selected
                ? { background: "#1a1a1a", color: "#ffffff", border: "1px solid #1a1a1a" }
                : { background: "#ffffff", color: "#1a1a1a", border: "1px solid #e5e5e5" }
            }
          >
            {selected ? "✓ Selected" : "Select"}
          </button>
        </div>
      </div>
    </div>
  );
}
