"use client";

import { useEffect, useState } from "react";
import { debounce } from "lodash";
import { Search, X } from "lucide-react";
import { Input, Button } from "@/app/_components/ui";

interface ItensFiltersProps {
  onSearchChange: (value: string) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

export function ItensFilters({
  onSearchChange,
  onClearFilters,
  hasActiveFilters,
}: ItensFiltersProps) {
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const debouncedSearch = debounce((value: string) => {
      onSearchChange(value);
    }, 300);

    debouncedSearch(searchInput);

    return () => {
      debouncedSearch.cancel();
    };
  }, [searchInput, onSearchChange]);

  const handleClear = () => {
    setSearchInput("");
    onClearFilters();
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 px-4 py-2 flex flex-col gap-2 w-full lg:max-w-[400px]">
      <div className="flex items-center gap-2">
        <Search className="h-4 w-4 text-gray-500" />
        <h3 className="text-sm font-medium text-gray-700">Buscar Item</h3>
        {hasActiveFilters && (
          <Button
            variant="secondary"
            size="sm"
            onClick={handleClear}
            className="ml-auto"
          >
            <X className="h-3 w-3 mr-1" />
            Limpar
          </Button>
        )}
      </div>

      <div>
        <Input
          type="text"
          placeholder="Digite SKU ou descrição para buscar..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-full"
        />
      </div>
    </div>
  );
}
