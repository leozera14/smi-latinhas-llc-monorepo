"use client";

import { memo } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Pencil, Trash2 } from "lucide-react";
import { Badge, Button } from "@/app/_components/ui";
import type { Demanda } from "@/types/demanda";

interface DemandasTableProps {
  demandas: Demanda[];
  onEdit: (demanda: Demanda) => void;
  onDelete: (id: number) => void;
}

interface DemandaRowProps {
  demanda: Demanda;
  onEdit: (demanda: Demanda) => void;
  onDelete: (id: number) => void;
}

const DemandaRow = memo(({ demanda, onEdit, onDelete }: DemandaRowProps) => {
  const calcularTotais = (demanda: Demanda) => {
    const [totalPlanejado, totalProduzido] = demanda.itens.reduce(
      ([planejado, produzido], item) => [
        planejado + item.totalPlanejado,
        produzido + item.totalProduzido,
      ],
      [0, 0]
    );

    return {
      totalPlanejado,
      totalProduzido,
      skus: demanda.itens.length,
    };
  };

  const { totalPlanejado, totalProduzido, skus } = calcularTotais(demanda);

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {format(new Date(demanda.dataInicial), "dd/MM/yyyy", {
          locale: ptBR,
        })}{" "}
        -{" "}
        {format(new Date(demanda.dataFinal), "dd/MM/yyyy", {
          locale: ptBR,
        })}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {skus}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {totalPlanejado.toLocaleString("pt-BR")}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {totalProduzido.toLocaleString("pt-BR")}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <Badge status={demanda.status} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onEdit(demanda)}
            title="Editar Demanda"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => onDelete(demanda.id)}
            title="Deletar Demanda"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </td>
    </tr>
  );
});

DemandaRow.displayName = "DemandaRow";

export function DemandasTable({
  demandas,
  onEdit,
  onDelete,
}: DemandasTableProps) {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="overflow-x-auto overflow-y-auto max-h-[480px] lg:max-h-[650px] pb-1">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Período (Inicial - Final)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                SKUs
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Plan (Tons)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Prod. (Tons)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {demandas.map((demanda) => (
              <DemandaRow
                key={demanda.id}
                demanda={demanda}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
