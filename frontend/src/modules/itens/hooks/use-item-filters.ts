import { useState, useMemo } from "react";
import type { Item } from "@/types/item";

export function useItemFilters(itens: Item[]) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItens = useMemo(() => {
    if (!searchTerm.trim()) {
      return itens;
    }

    const lowerSearchTerm = searchTerm.toLowerCase().trim();

    return itens.filter((item) => {
      const skuMatch = item.sku.toLowerCase().includes(lowerSearchTerm);
      const descricaoMatch = item.descricao
        .toLowerCase()
        .includes(lowerSearchTerm);

      return skuMatch || descricaoMatch;
    });
  }, [itens, searchTerm]);

  const hasActiveFilters = !!searchTerm.trim();

  const clearFilters = () => {
    setSearchTerm("");
  };

  return {
    // Filter states
    searchTerm,
    // Filter setters
    setSearchTerm,
    // Derived data
    filteredItens,
    hasActiveFilters,
    // Actions
    clearFilters,
  };
}
