"use client";

import { Plus } from "lucide-react";
import { Button, CircleLoading, EmptyState } from "@/app/_components/ui";
import { DemandasTable } from "./demandas-table";
import { useUIStore } from "@/stores/ui-store";
import type { Demanda } from "@/types/demanda";
import { useDeleteDemanda, useDemandas } from "@/hooks/use-demandas";

export function DemandasList() {
  const { data: demandas, isLoading, error } = useDemandas();
  const deleteMutation = useDeleteDemanda();
  const { openDemandaModal } = useUIStore();

  const handleEdit = (demanda: Demanda) => {
    // TODO: Abrir modal com demanda selecionada
    console.log("Editar demanda:", demanda);
    openDemandaModal();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir esta demanda?")) return;

    try {
      await deleteMutation.mutateAsync(id);
    } catch (error) {
      alert("Erro ao excluir demanda");
    }
  };

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

  if (!demandas) {
    return (
      <EmptyState
        title="Nenhuma demanda cadastrada"
        description="Comece criando sua primeira demanda de produção"
        action={
          <Button onClick={openDemandaModal}>
            <Plus className="h-4 w-4 mr-2" />
            Criar Demanda
          </Button>
        }
      />
    );
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Demandas de Produção de Latinhas
          </h1>
          <p className="text-gray-600 mt-1">
            Gerencie o planejamento de produção
          </p>
        </div>
        <Button onClick={openDemandaModal} size="lg">
          <Plus className="h-5 w-5 mr-2" />
          Adicionar
        </Button>
      </div>

      <DemandasTable
        demandas={demandas}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </>
  );
}
