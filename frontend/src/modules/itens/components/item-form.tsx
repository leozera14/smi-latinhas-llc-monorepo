"use client";

import { Button, Input, FormField } from "@/app/_components/ui";
import type { CreateItemFormData } from "../schemas/item.schema";
import type { Item } from "@/types/item";
import { useItemForm } from "../hooks";

interface ItemFormProps {
  onSubmit: (data: CreateItemFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
  initialData?: Item | null;
}

export function ItemForm({
  onSubmit,
  onCancel,
  isLoading,
  initialData,
}: ItemFormProps) {
  const { form, handleSubmit, submitButtonLabel } = useItemForm({
    initialData,
    onSubmit,
  });

  const {
    register,
    formState: { errors },
  } = form;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormField label="SKU" required error={errors.sku?.message}>
        <Input {...register("sku")} placeholder="Ex: LAT-001" />
      </FormField>

      <FormField label="Descrição" required error={errors.descricao?.message}>
        <Input
          {...register("descricao")}
          placeholder="Ex: Lata de alumínio 350ml"
        />
      </FormField>

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
