import { createCrudHooks } from "./use-crud";
import { ResourceType } from "@/types/crud";
import type { Item, CreateItemDTO, UpdateItemDTO } from "@/types/item";

const itemHooks = createCrudHooks<Item, CreateItemDTO, UpdateItemDTO>({
  resource: ResourceType.ITENS,
});

export const useItens = itemHooks.useList;
export const useItem = itemHooks.useDetail;
export const useCreateItem = itemHooks.useCreate;
export const useUpdateItem = itemHooks.useUpdate;
export const useDeleteItem = itemHooks.useDelete;
