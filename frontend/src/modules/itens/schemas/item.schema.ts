import { z } from "zod";

export const createItemSchema = z.object({
  sku: z.string().min(1, "SKU é obrigatório!"),
  descricao: z.string().min(1, "Descrição é obrigatória!"),
});

export const updateItemSchema = z.object({
  sku: z.string().min(1, "SKU é obrigatório!").optional(),
  descricao: z.string().min(1, "Descrição é obrigatória!").optional(),
});

export type CreateItemFormData = z.infer<typeof createItemSchema>;
export type UpdateItemFormData = z.infer<typeof updateItemSchema>;
