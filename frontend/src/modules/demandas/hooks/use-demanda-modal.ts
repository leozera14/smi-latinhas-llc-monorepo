import toast from "react-hot-toast";
import { useUIStore } from "@/stores/ui-store";
import { useCreateDemanda, useUpdateDemanda } from "@/hooks/use-demandas";
import type { CreateDemandaFormData } from "../schemas/demanda.schema";

export function useDemandaModal() {
  const { editingDemanda, closeDemandaModal } = useUIStore();
  const createMutation = useCreateDemanda();
  const updateMutation = useUpdateDemanda();

  const isEditing = !!editingDemanda;
  const isLoading = createMutation.isPending || updateMutation.isPending;

  const handleSubmit = async (data: CreateDemandaFormData) => {
    try {
      if (isEditing) {
        await updateMutation.mutateAsync({
          id: editingDemanda.id,
          data: {
            dataInicial: data.dataInicial,
            dataFinal: data.dataFinal,
            status: data.status,
            itens: data.itens.map((item) => ({
              itemId: item.itemId,
              totalPlanejado: item.totalPlanejado,
              totalProduzido: item.totalProduzido,
            })),
          },
        });

        toast.success("Demanda atualizada com sucesso!");
      } else {
        await createMutation.mutateAsync(data);
        toast.success("Demanda criada com sucesso!");
      }

      closeDemandaModal();
    } catch (error: any) {
      toast.error(
        error?.message || `Erro ao ${isEditing ? "atualizar" : "criar"} demanda`
      );
    }
  };

  return {
    isEditing,
    isLoading,
    editingDemanda,
    handleSubmit,
    closeDemandaModal,
  };
}
