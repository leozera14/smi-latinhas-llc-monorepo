import { STATUS_DEMANDA_VALUES } from "@/config/constants";
import { z } from "zod";

// Schemas for Demanda's actions following Backend structure

export const createDemandaSchema = z
  .object({
    dataInicial: z.string().min(1, "Data inicial é obrigatória!"),
    dataFinal: z.string().min(1, "Data final é obrigatória!"),
    status: z.enum(STATUS_DEMANDA_VALUES, {
      required_error: "Status é obrigatório!",
    }),
    itens: z
      .array(
        z.object({
          itemId: z.number().int().positive("Item é obrigatório!"),
          totalPlanejado: z
            .number()
            .positive("Total planejado deve ser maior que zero"),
          totalProduzido: z.number().nonnegative().default(0),
        })
      )
      .min(1, "A demanda deve ter pelo menos um item!"),
  })
  .refine(
    (data) => {
      const dataInicial = new Date(data.dataInicial);
      const dataFinal = new Date(data.dataFinal);
      return dataFinal >= dataInicial;
    },
    {
      message: "Data final deve ser maior ou igual à data inicial!",
      path: ["dataFinal"],
    }
  );

export const updateDemandaSchema = z
  .object({
    dataInicial: z.string().optional(),
    dataFinal: z.string().optional(),
    status: z.enum(STATUS_DEMANDA_VALUES).optional(),
    itens: z
      .array(
        z.object({
          id: z.number().int().positive().optional(),
          itemId: z.number().int().positive(),
          totalPlanejado: z.number().positive(),
          totalProduzido: z.number().nonnegative(),
        })
      )
      .optional(),
  })
  .refine(
    (data) => {
      if (data.dataInicial && data.dataFinal) {
        const dataInicial = new Date(data.dataInicial);
        const dataFinal = new Date(data.dataFinal);
        return dataFinal >= dataInicial;
      }
      return true;
    },
    {
      message: "Data final deve ser maior ou igual à data inicial!",
      path: ["dataFinal"],
    }
  );

export type CreateDemandaFormData = z.infer<typeof createDemandaSchema>;
export type UpdateDemandaFormData = z.infer<typeof updateDemandaSchema>;
