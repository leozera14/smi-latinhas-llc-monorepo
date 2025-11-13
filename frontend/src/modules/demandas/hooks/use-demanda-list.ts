import toast from "react-hot-toast";
import { useUIStore } from "@/stores/ui-store";
import { useDeleteDemanda } from "@/hooks/use-demandas";
import type { Demanda } from "@/types/demanda";

export function useDemandaList() {
  const { openDemandaModal, openConfirmModal, closeConfirmModal } =
    useUIStore();
  const deleteMutation = useDeleteDemanda();

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

  const handleOpenCreateModal = () => {
    openDemandaModal();
  };

  return {
    handleEdit,
    handleDelete,
    handleOpenCreateModal,
    isDeleting: deleteMutation.isPending,
  };
}
