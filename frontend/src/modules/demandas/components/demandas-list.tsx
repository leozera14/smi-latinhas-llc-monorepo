"use client";

import toast from "react-hot-toast";
import { Plus } from "lucide-react";
import {
  Button,
  CircleLoading,
  EmptyState,
  ConfirmModal,
} from "@/app/_components/ui";
import { DemandasTable } from "./demandas-table";
import { useUIStore } from "@/stores/ui-store";
import type { Demanda } from "@/types/demanda";
import { useDeleteDemanda, useDemandas } from "@/hooks/use-demandas";

export function DemandasList() {
  const { data: demandas, isLoading, error } = useDemandas();
  const deleteMutation = useDeleteDemanda();
  const {
    openDemandaModal,
    isConfirmModalOpen,
    confirmModalData,
    openConfirmModal,
    closeConfirmModal,
  } = useUIStore();

  const handleEdit = (demanda: Demanda) => {
    openDemandaModal(demanda);
  };

  const handleDelete = (id: number) => {
    openConfirmModal({
      title: "Excluir Demanda",
      description:
        "Tem certeza que deseja excluir esta demanda? Esta ação não pode ser desfeita.",
      onConfirm: async () => {
        try {
          await deleteMutation.mutateAsync(id);
          toast.success("Demanda excluída com sucesso!");
          closeConfirmModal();
        } catch (error: any) {
          toast.error(error?.message || "Erro ao excluir demanda!");
        }
      },
    });
  };

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
          <Button onClick={() => openDemandaModal()}>
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
        <Button onClick={() => openDemandaModal()} size="lg">
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
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}
