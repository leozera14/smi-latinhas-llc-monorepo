"use client";

import { Plus } from "lucide-react";
import {
  Button,
  CircleLoading,
  EmptyState,
  ConfirmModal,
} from "@/app/_components/ui";
import { DemandasTable } from "./demandas-table";
import { useUIStore } from "@/stores/ui-store";
import { useDemandas } from "@/hooks/use-demandas";
import { useDemandaList } from "../hooks";

export function DemandasList() {
  const { data: demandas, isLoading, error } = useDemandas();
  const { isConfirmModalOpen, confirmModalData, closeConfirmModal } =
    useUIStore();
  const { handleEdit, handleDelete, handleOpenCreateModal, isDeleting } =
    useDemandaList();

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

  if (!demandas || demandas.length === 0) {
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
    <div className="flex flex-col gap-2.5">
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

      <div className="flex items-center justify-end w-full">
        <Button onClick={handleOpenCreateModal} size="lg">
          <Plus className="h-5 w-5 mr-2" />
          Adicionar
        </Button>
      </div>

      <DemandasTable
        demandas={demandas}
        onEdit={handleEdit}
        onDelete={handleDelete}
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
