import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StatusDemanda } from "@/config/constants";
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
  const formatDateForInput = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const form = useForm<CreateDemandaFormData>({
    resolver: zodResolver(createDemandaSchema),
    defaultValues: initialData
      ? {
          dataInicial: formatDateForInput(initialData.dataInicial),
          dataFinal: formatDateForInput(initialData.dataFinal),
          status: initialData.status,
          itens: initialData.itens.map((item) => ({
            itemId: item.itemId,
            totalPlanejado: item.totalPlanejado,
            totalProduzido: item.totalProduzido,
          })),
        }
      : {
          status: StatusDemanda.PLANEJAMENTO,
          itens: [],
        },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "itens",
  });

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

  return {
    form,
    fields,
    handleAddItem,
    removeItem: remove,
    handleSubmit: form.handleSubmit(onSubmit),
    submitButtonLabel,
  };
}
