import { z } from "zod";

export const createItemSchema = z.object({
  sku: z.string().min(1, "SKU é obrigatório"),
  descricao: z.string().optional(),
});

export const updateItemSchema = z.object({
  sku: z.string().min(1, "SKU é obrigatório").optional(),
  descricao: z.string().optional(),
});

export type CreateItemInput = z.infer<typeof createItemSchema>;
export type UpdateItemInput = z.infer<typeof updateItemSchema>;
