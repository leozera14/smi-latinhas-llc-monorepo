import toast from "react-hot-toast";
import { useUIStore } from "@/stores/ui-store";
import { useDeleteItem } from "@/hooks/use-itens";
import type { Item } from "@/types/item";

export function useItemList() {
  const { openItemModal, openConfirmModal, closeConfirmModal } = useUIStore();
  const deleteMutation = useDeleteItem();

  const handleEdit = (item: Item) => {
    openItemModal(item);
  };

  const handleDelete = (id: number) => {
    openConfirmModal({
      title: "Excluir Item",
      description:
        "Tem certeza que deseja excluir este item? Esta ação não pode ser desfeita.",
      onConfirm: async () => {
        try {
          await deleteMutation.mutateAsync(id);
          toast.success("Item excluído com sucesso!");
          closeConfirmModal();
        } catch (error: any) {
          toast.error(error?.message || "Erro ao excluir item!");
        }
      },
    });
  };

  const handleOpenCreateModal = () => {
    openItemModal();
  };

  return {
    handleEdit,
    handleDelete,
    handleOpenCreateModal,
    isDeleting: deleteMutation.isPending,
  };
}
