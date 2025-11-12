import { UseMutationResult, UseQueryResult } from "@tanstack/react-query";

export enum ResourceType {
  DEMANDAS = "demandas",
  ITENS = "itens",
}

export const RESOURCE_ENDPOINTS: Record<ResourceType, string> = {
  [ResourceType.DEMANDAS]: "/demandas",
  [ResourceType.ITENS]: "/items",
};

export interface CrudHooksConfig<TEntity> {
  resource: ResourceType;
  idKey?: keyof TEntity;
}

export interface CrudHooks<TEntity, TCreateDTO, TUpdateDTO> {
  useList: () => UseQueryResult<TEntity[], Error>;
  useDetail: (id: string | number) => UseQueryResult<TEntity, Error>;
  useCreate: () => UseMutationResult<TEntity, Error, TCreateDTO>;
  useUpdate: () => UseMutationResult<
    TEntity,
    Error,
    { id: string | number; data: TUpdateDTO }
  >;
  useDelete: () => UseMutationResult<void, Error, string | number>;
}
