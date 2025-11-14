"use client";

import { Filter, X } from "lucide-react";
import { Input, Select, Button } from "@/app/_components/ui";
import { StatusDemanda } from "@/config/constants";

interface DemandasFiltersProps {
  statusFilter: string;
  dataInicialFilter: string;
  dataFinalFilter: string;
  onStatusChange: (value: string) => void;
  onDataInicialChange: (value: string) => void;
  onDataFinalChange: (value: string) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

export function DemandasFilters({
  statusFilter,
  dataInicialFilter,
  dataFinalFilter,
  onStatusChange,
  onDataInicialChange,
  onDataFinalChange,
  onClearFilters,
  hasActiveFilters,
}: DemandasFiltersProps) {
  return (
    <div className="w-full flex flex-col gap-2 bg-white rounded-lg border border-gray-200 px-4 py-2">
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-gray-500" />
        <h3 className="text-sm font-medium text-gray-700">Filtros</h3>
        {hasActiveFilters && (
          <Button
            variant="secondary"
            size="sm"
            onClick={onClearFilters}
            className="ml-auto"
          >
            <X className="h-3 w-3 mr-1" />
            Limpar
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Data Inicial (a partir de)
          </label>
          <Input
            type="date"
            value={dataInicialFilter}
            onChange={(e) => onDataInicialChange(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Data Final (até)
          </label>
          <Input
            type="date"
            value={dataFinalFilter}
            onChange={(e) => onDataFinalChange(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Status
          </label>
          <Select
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
          >
            <option value="">Todos</option>
            <option value={StatusDemanda.PLANEJAMENTO}>Planejamento</option>
            <option value={StatusDemanda.EM_ANDAMENTO}>Em Andamento</option>
            <option value={StatusDemanda.CONCLUIDO}>Concluído</option>
          </Select>
        </div>
      </div>
    </div>
  );
}
