import toast from "react-hot-toast";
import { useUIStore } from "@/stores/ui-store";
import { useCreateItem, useUpdateItem } from "@/hooks/use-itens";
import type { CreateItemFormData } from "../schemas/item.schema";

export function useItemModal() {
  const { editingItem, closeItemModal } = useUIStore();
  const createMutation = useCreateItem();
  const updateMutation = useUpdateItem();

  const isEditing = !!editingItem;
  const isLoading = createMutation.isPending || updateMutation.isPending;

  const handleSubmit = async (data: CreateItemFormData) => {
    try {
      if (isEditing) {
        await updateMutation.mutateAsync({
          id: editingItem.id,
          data: {
            sku: data.sku,
            descricao: data.descricao,
          },
        });

        toast.success("Item atualizado com sucesso!");
      } else {
        await createMutation.mutateAsync(data);
        toast.success("Item criado com sucesso!");
      }

      closeItemModal();
    } catch (error: any) {
      toast.error(
        error?.message || `Erro ao ${isEditing ? "atualizar" : "criar"} item`
      );
    }
  };

  return {
    isEditing,
    isLoading,
    editingItem,
    handleSubmit,
    closeItemModal,
  };
}
