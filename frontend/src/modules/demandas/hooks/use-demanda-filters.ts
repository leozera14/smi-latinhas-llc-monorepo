import { useState, useMemo } from "react";
import type { Demanda } from "@/types/demanda";

export function useDemandaFilters(demandas: Demanda[]) {
  const [statusFilter, setStatusFilter] = useState("");
  const [dataInicialFilter, setDataInicialFilter] = useState("");
  const [dataFinalFilter, setDataFinalFilter] = useState("");

  const filteredDemandas = useMemo(() => {
    return demandas.filter((demanda) => {
      // Status filter
      if (statusFilter && demanda.status !== statusFilter) {
        return false;
      }

      // Data Inicial filter (demanda starts on or after this date)
      if (dataInicialFilter) {
        const demandaDataInicial = new Date(demanda.dataInicial);
        const filterDate = new Date(dataInicialFilter);
        if (demandaDataInicial < filterDate) {
          return false;
        }
      }

      // Data Final filter (demanda ends on or before this date)
      if (dataFinalFilter) {
        const demandaDataFinal = new Date(demanda.dataFinal);
        const filterDate = new Date(dataFinalFilter);
        if (demandaDataFinal > filterDate) {
          return false;
        }
      }

      return true;
    });
  }, [demandas, statusFilter, dataInicialFilter, dataFinalFilter]);

  const hasActiveFilters = !!(
    statusFilter ||
    dataInicialFilter ||
    dataFinalFilter
  );

  const clearFilters = () => {
    setStatusFilter("");
    setDataInicialFilter("");
    setDataFinalFilter("");
  };

  return {
    // Filter states
    statusFilter,
    dataInicialFilter,
    dataFinalFilter,
    // Filter setters
    setStatusFilter,
    setDataInicialFilter,
    setDataFinalFilter,
    // Derived data
    filteredDemandas,
    hasActiveFilters,
    // Actions
    clearFilters,
  };
}
