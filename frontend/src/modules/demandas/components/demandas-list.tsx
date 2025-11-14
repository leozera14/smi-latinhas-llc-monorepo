"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import {
  Button,
  CircleLoading,
  EmptyState,
  ConfirmModal,
  Pagination,
} from "@/app/_components/ui";
import { DemandasTable } from "./demandas-table";
import { DemandasFilters } from "./demandas-filters";
import { useUIStore } from "@/stores/ui-store";
import { useDemandas } from "@/hooks/use-demandas";
import { useDemandaList, useDemandaFilters } from "../hooks";
import { DEFAULT_PAGE_SIZE } from "@/config/constants";

export function DemandasList() {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: response,
    isLoading,
    error,
  } = useDemandas(currentPage, DEFAULT_PAGE_SIZE);

  const { isConfirmModalOpen, confirmModalData, closeConfirmModal } =
    useUIStore();
  const { handleEdit, handleDelete, handleOpenCreateModal, isDeleting } =
    useDemandaList();

  const allDemandas = response?.data || [];
  const pagination = response?.pagination;

  const {
    statusFilter,
    dataInicialFilter,
    dataFinalFilter,
    setStatusFilter,
    setDataInicialFilter,
    setDataFinalFilter,
    filteredDemandas,
    hasActiveFilters,
    clearFilters,
  } = useDemandaFilters(allDemandas);

  const handleConfirmDelete = () => confirmModalData?.onConfirm?.();

  if (isLoading) {
    return <CircleLoading size="lg" className="py-12" />;
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
        <p className="font-medium">Erro ao carregar demandas</p>
        <p className="text-sm mt-1">{error.message}</p>
      </div>
    );
  }

  const showEmptyState = !allDemandas || allDemandas.length === 0;
  const showNoResults =
    !showEmptyState && filteredDemandas.length === 0 && hasActiveFilters;

  if (showEmptyState) {
    return (
      <EmptyState
        title="Nenhuma demanda cadastrada"
        description="Comece criando sua primeira demanda de produção"
        action={
          <Button onClick={handleOpenCreateModal}>
            <Plus className="h-4 w-4 mr-2" />
            Criar Demanda
          </Button>
        }
      />
    );
  }

  return (
    <div className="flex flex-col gap-2.5 h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Demandas de Produção de Latinhas
          </h1>
          <p className="text-gray-600 mt-1">
            Gerencie o planejamento de produção
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-end justify-between w-full gap-4">
        <div className="w-full lg:w-auto">
          <DemandasFilters
            statusFilter={statusFilter}
            dataInicialFilter={dataInicialFilter}
            dataFinalFilter={dataFinalFilter}
            onStatusChange={setStatusFilter}
            onDataInicialChange={setDataInicialFilter}
            onDataFinalChange={setDataFinalFilter}
            onClearFilters={clearFilters}
            hasActiveFilters={hasActiveFilters}
          />
        </div>

        <Button
          onClick={handleOpenCreateModal}
          size="lg"
          className="w-full lg:w-auto lg:flex-shrink-0"
        >
          <Plus className="h-5 w-5 mr-2" />
          Adicionar
        </Button>
      </div>

      {showNoResults ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 text-center">
          <p className="text-yellow-800 font-medium">
            Nenhuma demanda encontrada com os filtros aplicados
          </p>
          <Button
            variant="secondary"
            size="sm"
            onClick={clearFilters}
            className="mt-4"
          >
            Limpar Filtros
          </Button>
        </div>
      ) : (
        <DemandasTable
          demandas={filteredDemandas}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <Pagination
        currentPage={pagination?.page || 1}
        totalPages={pagination?.totalPages || 1}
        onPageChange={setCurrentPage}
        isLoading={isLoading}
      />

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={closeConfirmModal}
        onConfirm={handleConfirmDelete}
        title={confirmModalData?.title || ""}
        description={confirmModalData?.description || ""}
        confirmText="Excluir"
        cancelText="Cancelar"
        variant="danger"
        isLoading={isDeleting}
      />
    </div>
  );
}
