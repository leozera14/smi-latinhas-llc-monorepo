import { useEffect, useMemo } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StatusDemanda } from "@/config/constants";
import { useItens } from "@/hooks/use-itens";
import {
  createDemandaSchema,
  type CreateDemandaFormData,
} from "../schemas/demanda.schema";
import type { Demanda } from "@/types/demanda";

interface UseDemandaFormStateParams {
  initialData?: Demanda | null;
  onSubmit: (data: CreateDemandaFormData) => void;
}

export function useDemandaForm({
  initialData,
  onSubmit,
}: UseDemandaFormStateParams) {
  const { data: itensResponse, isSuccess: itensLoaded } = useItens(1, 100);
  const itensDisponiveis = itensResponse?.data;

  const formatDateForInput = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const getInitialValues = () => {
    if (!initialData) {
      return {
        status: StatusDemanda.PLANEJAMENTO,
        itens: [],
      };
    }

    return {
      dataInicial: formatDateForInput(initialData.dataInicial),
      dataFinal: formatDateForInput(initialData.dataFinal),
      status: initialData.status,
      itens: initialData.itens.map((item) => ({
        itemId: item.itemId,
        totalPlanejado: item.totalPlanejado,
        totalProduzido: item.totalProduzido,
      })),
    };
  };

  const form = useForm<CreateDemandaFormData>({
    resolver: zodResolver(createDemandaSchema),
    defaultValues: getInitialValues(),
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "itens",
  });

  // This ensures Select values are properly set on first modal open
  useEffect(() => {
    if (initialData && itensLoaded && itensDisponiveis) {
      form.reset(getInitialValues());
    }
  }, [itensLoaded, initialData]);

  const handleAddItem = () => {
    append({
      itemId: 0,
      totalPlanejado: 0,
      totalProduzido: 0,
    });
  };

  const submitButtonLabel = (isLoading: boolean) =>
    isLoading
      ? "Salvando..."
      : initialData
      ? "Atualizar Demanda"
      : "Salvar Demanda";

  // Get selected item IDs to disable them in other selects
  const selectedItemIds = useMemo(() => {
    return fields.map((field) => field.itemId).filter((id) => id !== 0);
  }, [fields]);

  // Check if an item should be disabled (already selected in another select)
  const isItemDisabled = (itemId: number, currentIndex: number) => {
    const currentFieldValue = fields[currentIndex]?.itemId;

    // Don't disable if it's the currently selected item in this select
    if (currentFieldValue === itemId) return false;

    return selectedItemIds.includes(itemId);
  };

  return {
    form,
    fields,
    handleAddItem,
    removeItem: remove,
    handleSubmit: form.handleSubmit(onSubmit),
    submitButtonLabel,
    itensDisponiveis,
    isItemDisabled,
    hasNoItems: !itensDisponiveis || itensDisponiveis.length === 0,
  };
}
