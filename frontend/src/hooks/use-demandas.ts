import { createCrudHooks } from "./use-crud";
import { ResourceType } from "@/types/crud";
import type {
  Demanda,
  CreateDemandaDTO,
  UpdateDemandaDTO,
} from "@/types/demanda";

const demandaHooks = createCrudHooks<
  Demanda,
  CreateDemandaDTO,
  UpdateDemandaDTO
>({
  resource: ResourceType.DEMANDAS,
});

export const useDemandas = demandaHooks.useList;
export const useDemanda = demandaHooks.useDetail;
export const useCreateDemanda = demandaHooks.useCreate;
export const useUpdateDemanda = demandaHooks.useUpdate;
export const useDeleteDemanda = demandaHooks.useDelete;
