import { z } from "zod";
import { STATUS_DEMANDA_VALUES } from "../types/demanda.types";

export const createDemandaSchema = z.object({
  dataInicial: z.coerce.date(),
  dataFinal: z.coerce.date(),
  status: z.enum(STATUS_DEMANDA_VALUES).default("PLANEJAMENTO"),
  itens: z
    .array(
      z.object({
        itemId: z.number().int().positive(),
        totalPlanejado: z.number().positive(),
        totalProduzido: z.number().nonnegative().default(0),
      })
    )
    .min(1, "A demanda deve ter pelo menos um item"),
});

export const updateDemandaSchema = z.object({
  dataInicial: z.coerce.date().optional(),
  dataFinal: z.coerce.date().optional(),
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
});

export type CreateDemandaInput = z.infer<typeof createDemandaSchema>;
export type UpdateDemandaInput = z.infer<typeof updateDemandaSchema>;
