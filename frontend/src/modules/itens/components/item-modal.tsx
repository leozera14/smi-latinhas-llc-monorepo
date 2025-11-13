"use client";

import { Modal } from "@/app/_components/ui";
import { useUIStore } from "@/stores/ui-store";
import { useItemModal } from "../hooks";
import { ItemForm } from "./item-form";

export function ItemModal() {
  const { isItemModalOpen } = useUIStore();
  const { isEditing, isLoading, editingItem, handleSubmit, closeItemModal } =
    useItemModal();

  return (
    <Modal
      isOpen={isItemModalOpen}
      onClose={closeItemModal}
      title={isEditing ? "Editar Item" : "Novo Item"}
      size="md"
    >
      <ItemForm
        onSubmit={handleSubmit}
        onCancel={closeItemModal}
        isLoading={isLoading}
        initialData={editingItem}
      />
    </Modal>
  );
}
