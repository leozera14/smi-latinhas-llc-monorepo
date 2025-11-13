"use client";

import { Plus } from "lucide-react";
import {
  Button,
  CircleLoading,
  EmptyState,
  ConfirmModal,
} from "@/app/_components/ui";
import { ItensTable } from "./itens-table";
import { useUIStore } from "@/stores/ui-store";
import { useItens } from "@/hooks/use-itens";
import { useItemList } from "../hooks";

export function ItensList() {
  const { data: itens, isLoading, error } = useItens();
  const { isConfirmModalOpen, confirmModalData, closeConfirmModal } =
    useUIStore();
  const { handleEdit, handleDelete, handleOpenCreateModal, isDeleting } =
    useItemList();

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

  if (!itens || itens.length === 0) {
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
    <div className="flex flex-col gap-2.5">
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

      <div className="flex items-center justify-end w-full">
        <Button onClick={handleOpenCreateModal} size="lg">
          <Plus className="h-5 w-5 mr-2" />
          Adicionar
        </Button>
      </div>

      <ItensTable itens={itens} onEdit={handleEdit} onDelete={handleDelete} />

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
