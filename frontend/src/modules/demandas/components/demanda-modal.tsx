"use client";

import toast from "react-hot-toast";
import { Modal } from "@/app/_components/ui";
import { useUIStore } from "@/stores/ui-store";
import { useCreateDemanda } from "@/hooks/use-demandas";
import { DemandaForm } from "./demanda-form";
import type { CreateDemandaFormData } from "../schemas/demanda.schema";

export function DemandaModal() {
  const { isDemandaModalOpen, closeDemandaModal } = useUIStore();
  const createMutation = useCreateDemanda();

  const handleSubmit = async (data: CreateDemandaFormData) => {
    try {
      await createMutation.mutateAsync(data);

      toast.success("Demanda criada com sucesso!");

      closeDemandaModal();
    } catch (error: any) {
      toast.error(error?.message || "Erro ao criar demanda");
    }
  };

  return (
    <Modal
      isOpen={isDemandaModalOpen}
      onClose={closeDemandaModal}
      title="Nova Demanda de Produção"
      size="xl"
    >
      <DemandaForm
        onSubmit={handleSubmit}
        onCancel={closeDemandaModal}
        isLoading={createMutation.isPending}
      />
    </Modal>
  );
}
