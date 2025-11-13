"use client";

import toast from "react-hot-toast";
import { Modal } from "@/app/_components/ui";
import { useUIStore } from "@/stores/ui-store";
import { useCreateDemanda, useUpdateDemanda } from "@/hooks/use-demandas";
import { DemandaForm } from "./demanda-form";
import type { CreateDemandaFormData } from "../schemas/demanda.schema";

export function DemandaModal() {
  const { isDemandaModalOpen, editingDemanda, closeDemandaModal } =
    useUIStore();
  const createMutation = useCreateDemanda();
  const updateMutation = useUpdateDemanda();

  const isEditing = !!editingDemanda;

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

        return;
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
        isLoading={createMutation.isPending || updateMutation.isPending}
        initialData={editingDemanda}
      />
    </Modal>
  );
}
