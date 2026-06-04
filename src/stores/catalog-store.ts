import { create } from "zustand";

export interface Razor {
  id: string;
  name: string;
  material: string;
  type: "Adjustable" | "Fixed";
  price: number;
  inStock: boolean;
}

export const RAZORS: Razor[] = [
  { id: "1", name: "Rockwell 6S Adjustable", material: "Stainless Steel", type: "Adjustable", price: 120, inStock: true },
  { id: "2", name: "Rockwell 6C", material: "Chrome", type: "Fixed", price: 80, inStock: true },
  { id: "3", name: "Rockwell T2", material: "Gunmetal", type: "Adjustable", price: 50, inStock: true },
  { id: "4", name: "Rockwell R1", material: "White Chrome", type: "Fixed", price: 40, inStock: true },
  { id: "5", name: "Rockwell Model T", material: "Matte Black", type: "Adjustable", price: 150, inStock: false },
  { id: "6", name: "Rockwell 2C", material: "Chrome", type: "Fixed", price: 30, inStock: true },
  { id: "7", name: "Rockwell 6S Rose Gold", material: "Rose Gold", type: "Adjustable", price: 135, inStock: true },
  { id: "8", name: "Rockwell 6C Gunmetal", material: "Gunmetal", type: "Fixed", price: 85, inStock: false },
  { id: "9", name: "Rockwell M1", material: "White Chrome", type: "Adjustable", price: 95, inStock: true },
  { id: "10", name: "Rockwell 2C Rose Gold", material: "Rose Gold", type: "Fixed", price: 35, inStock: true },
  { id: "11", name: "Rockwell Pro S", material: "Stainless Steel", type: "Adjustable", price: 175, inStock: false },
  { id: "12", name: "Rockwell Classic", material: "Chrome", type: "Fixed", price: 25, inStock: true },
];

interface CatalogState {
  selectedMaterials: string[];
  selectedTypes: string[];
  inStockOnly: boolean;
  searchQuery: string;
  sortBy: string;
  selectedRazorId: string;
  toggleMaterial: (material: string) => void;
  toggleType: (type: string) => void;
  setInStockOnly: (value: boolean) => void;
  setSearchQuery: (query: string) => void;
  setSortBy: (sort: string) => void;
  setSelectedRazorId: (id: string) => void;
  clearFilters: () => void;
  removeFilter: (kind: "material" | "type" | "inStock", value?: string) => void;
}

export const useCatalogStore = create<CatalogState>((set) => ({
  selectedMaterials: [],
  selectedTypes: [],
  inStockOnly: false,
  searchQuery: "",
  sortBy: "featured",
  selectedRazorId: "",

  toggleMaterial: (material) =>
    set((s) => ({
      selectedMaterials: s.selectedMaterials.includes(material)
        ? s.selectedMaterials.filter((m) => m !== material)
        : [...s.selectedMaterials, material],
    })),

  toggleType: (type) =>
    set((s) => ({
      selectedTypes: s.selectedTypes.includes(type)
        ? s.selectedTypes.filter((t) => t !== type)
        : [...s.selectedTypes, type],
    })),

  setInStockOnly: (value) => set({ inStockOnly: value }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSortBy: (sort) => set({ sortBy: sort }),
  setSelectedRazorId: (id) => set({ selectedRazorId: id }),

  clearFilters: () =>
    set({ selectedMaterials: [], selectedTypes: [], inStockOnly: false, searchQuery: "" }),

  removeFilter: (kind, value) =>
    set((s) => {
      if (kind === "material" && value)
        return { selectedMaterials: s.selectedMaterials.filter((m) => m !== value) };
      if (kind === "type" && value)
        return { selectedTypes: s.selectedTypes.filter((t) => t !== value) };
      if (kind === "inStock")
        return { inStockOnly: false };
      return {};
    }),
}));
