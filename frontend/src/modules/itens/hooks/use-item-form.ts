import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createItemSchema,
  type CreateItemFormData,
} from "../schemas/item.schema";
import type { Item } from "@/types/item";

interface UseItemFormParams {
  initialData?: Item | null;
  onSubmit: (data: CreateItemFormData) => void;
}

export function useItemForm({ initialData, onSubmit }: UseItemFormParams) {
  const form = useForm<CreateItemFormData>({
    resolver: zodResolver(createItemSchema),
    defaultValues: initialData
      ? {
          sku: initialData.sku,
          descricao: initialData.descricao,
        }
      : {
          sku: "",
          descricao: "",
        },
  });

  const submitButtonLabel = (isLoading: boolean) =>
    isLoading ? "Salvando..." : initialData ? "Atualizar Item" : "Salvar Item";

  return {
    form,
    handleSubmit: form.handleSubmit(onSubmit),
    submitButtonLabel,
  };
}
