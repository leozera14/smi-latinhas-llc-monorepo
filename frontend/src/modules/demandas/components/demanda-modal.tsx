"use client";

import { Modal } from "@/app/_components/ui";
import { useUIStore } from "@/stores/ui-store";
import { useDemandaModal } from "../hooks";
import { DemandaForm } from "./demanda-form";

export function DemandaModal() {
  const { isDemandaModalOpen } = useUIStore();
  const {
    isEditing,
    isLoading,
    editingDemanda,
    handleSubmit,
    closeDemandaModal,
  } = useDemandaModal();

  return (
    <Modal
      isOpen={isDemandaModalOpen}
      onClose={closeDemandaModal}
      title={
        isEditing ? "Editar Demanda de Produção" : "Nova Demanda de Produção"
      }
      size="xl"
    >
      <DemandaForm
        onSubmit={handleSubmit}
        onCancel={closeDemandaModal}
        isLoading={isLoading}
        initialData={editingDemanda}
      />
    </Modal>
  );
}
