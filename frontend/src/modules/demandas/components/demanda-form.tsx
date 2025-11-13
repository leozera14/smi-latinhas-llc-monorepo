"use client";

import { Plus, Trash2 } from "lucide-react";
import {
  Button,
  Input,
  Select,
  FormField,
  FormFieldSmall,
} from "@/app/_components/ui";
import { useItens } from "@/hooks/use-itens";
import { StatusDemanda } from "@/config/constants";
import type { CreateDemandaFormData } from "../schemas/demanda.schema";
import type { Demanda } from "@/types/demanda";
import { useDemandaForm } from "../hooks";

interface DemandaFormProps {
  onSubmit: (data: CreateDemandaFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
  initialData?: Demanda | null;
}

export function DemandaForm({
  onSubmit,
  onCancel,
  isLoading,
  initialData,
}: DemandaFormProps) {
  const { data: itensDisponiveis } = useItens();
  const {
    form,
    fields,
    handleAddItem,
    removeItem,
    handleSubmit,
    submitButtonLabel,
  } = useDemandaForm({ initialData, onSubmit });

  const {
    register,
    formState: { errors },
  } = form;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Data Inicial"
          required
          error={errors.dataInicial?.message}
        >
          <Input type="date" {...register("dataInicial")} />
        </FormField>

        <FormField
          label="Data Final"
          required
          error={errors.dataFinal?.message}
        >
          <Input type="date" {...register("dataFinal")} />
        </FormField>
      </div>

      <FormField label="Status" required error={errors.status?.message}>
        <Select {...register("status")}>
          <option value={StatusDemanda.PLANEJAMENTO}>Planejamento</option>
          <option value={StatusDemanda.EM_ANDAMENTO}>Em Andamento</option>
          <option value={StatusDemanda.CONCLUIDO}>Concluído</option>
        </Select>
      </FormField>

      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-medium text-gray-700">
            Itens * (mínimo 1)
          </label>
          <Button
            type="button"
            size="sm"
            onClick={handleAddItem}
            disabled={!itensDisponiveis || itensDisponiveis.length === 0}
          >
            <Plus className="h-4 w-4 mr-1" />
            Adicionar Item
          </Button>
        </div>

        {errors.itens?.message && (
          <p className="mb-3 text-sm text-red-600">{errors.itens.message}</p>
        )}

        <div className="space-y-3">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="grid grid-cols-1 md:grid-cols-4 gap-3 p-4 bg-gray-50 rounded-lg"
            >
              <FormFieldSmall
                label="Item"
                error={errors.itens?.[index]?.itemId?.message}
              >
                <Select
                  {...register(`itens.${index}.itemId`, {
                    valueAsNumber: true,
                  })}
                >
                  <option value={0}>Selecione...</option>
                  {itensDisponiveis?.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.sku} - {item.descricao}
                    </option>
                  ))}
                </Select>
              </FormFieldSmall>

              <FormFieldSmall label="Total Planejado (Tons)">
                <Input
                  type="number"
                  step="0.01"
                  {...register(`itens.${index}.totalPlanejado`, {
                    valueAsNumber: true,
                  })}
                  error={errors.itens?.[index]?.totalPlanejado?.message}
                />
              </FormFieldSmall>

              <FormFieldSmall label="Total Produzido (Tons)">
                <Input
                  type="number"
                  step="0.01"
                  {...register(`itens.${index}.totalProduzido`, {
                    valueAsNumber: true,
                  })}
                  error={errors.itens?.[index]?.totalProduzido?.message}
                />
              </FormFieldSmall>

              <div className="flex items-end">
                <Button
                  type="button"
                  variant="danger"
                  size="sm"
                  onClick={() => removeItem(index)}
                  className="w-full"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Remover
                </Button>
              </div>
            </div>
          ))}

          {fields.length === 0 && (
            <div className="text-center py-8 text-gray-500 text-sm">
              Nenhum item adicionado. Clique em "Adicionar Item" para começar.
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-4 border-t">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isLoading}>
          {submitButtonLabel(isLoading || false)}
        </Button>
      </div>
    </form>
  );
}
