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
import { ItensTable } from "./itens-table";
import { ItensFilters } from "./itens-filters";
import { useUIStore } from "@/stores/ui-store";
import { useItens } from "@/hooks/use-itens";
import { useItemList, useItemFilters } from "../hooks";
import { DEFAULT_PAGE_SIZE } from "@/config/constants";

export function ItensList() {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: response,
    isLoading,
    error,
  } = useItens(currentPage, DEFAULT_PAGE_SIZE);

  const { isConfirmModalOpen, confirmModalData, closeConfirmModal } =
    useUIStore();
  const { handleEdit, handleDelete, handleOpenCreateModal, isDeleting } =
    useItemList();

  const allItens = response?.data || [];
  const pagination = response?.pagination;

  const {
    searchTerm,
    setSearchTerm,
    filteredItens,
    hasActiveFilters,
    clearFilters,
  } = useItemFilters(allItens);

  const handleConfirmDelete = () => confirmModalData?.onConfirm?.();

  if (isLoading) {
    return <CircleLoading size="lg" className="py-12" />;
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
        <p className="font-medium">Erro ao carregar itens</p>
        <p className="text-sm mt-1">{error.message}</p>
      </div>
    );
  }

  const showEmptyState = !allItens || allItens.length === 0;
  const showNoResults =
    !showEmptyState && filteredItens.length === 0 && hasActiveFilters;

  if (showEmptyState) {
    return (
      <EmptyState
        title="Nenhum item cadastrado"
        description="Comece criando seu primeiro item de produção"
        action={
          <Button onClick={handleOpenCreateModal}>
            <Plus className="h-4 w-4 mr-2" />
            Criar Item
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
            Itens de Produção
          </h1>
          <p className="text-gray-600 mt-1">
            Gerencie os itens disponíveis para produção
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-end justify-between w-full gap-4">
        <ItensFilters
          onSearchChange={setSearchTerm}
          onClearFilters={clearFilters}
          hasActiveFilters={hasActiveFilters}
        />

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
            Nenhum item encontrado com o termo de busca
          </p>
          <Button
            variant="secondary"
            size="sm"
            onClick={clearFilters}
            className="mt-4"
          >
            Limpar Busca
          </Button>
        </div>
      ) : (
        <ItensTable
          itens={filteredItens}
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
