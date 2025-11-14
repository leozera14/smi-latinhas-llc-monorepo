"use client";

import { memo } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/app/_components/ui";
import type { Item } from "@/types/item";
import { formatDate } from "@/lib/utils";

interface ItensTableProps {
  itens: Item[];
  onEdit: (item: Item) => void;
  onDelete: (id: number) => void;
}

interface ItemRowProps {
  item: Item;
  onEdit: (item: Item) => void;
  onDelete: (id: number) => void;
}

const ItemRow = memo(({ item, onEdit, onDelete }: ItemRowProps) => {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-sm font-medium text-gray-900">{item.sku}</span>
      </td>
      <td className="px-6 py-4">
        <span className="text-sm text-gray-900">{item.descricao}</span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-sm text-gray-500">
          {formatDate(item.createdAt)}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex items-center justify-end gap-2">
          <Button variant="secondary" size="sm" onClick={() => onEdit(item)}>
            <Pencil className="h-4 w-4 mr-1" />
            Editar
          </Button>
          <Button variant="danger" size="sm" onClick={() => onDelete(item.id)}>
            <Trash2 className="h-4 w-4 mr-1" />
            Excluir
          </Button>
        </div>
      </td>
    </tr>
  );
});

ItemRow.displayName = "ItemRow";

export function ItensTable({ itens, onEdit, onDelete }: ItensTableProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white">
      <div className="overflow-x-auto overflow-y-auto max-h-[480px] lg:max-h-[650px] pb-1">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                SKU
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Descrição
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Criado em
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {itens.map((item) => (
              <ItemRow
                key={item.id}
                item={item}
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
