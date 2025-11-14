import { UseMutationResult, UseQueryResult } from "@tanstack/react-query";

export enum ResourceType {
  DEMANDAS = "demandas",
  ITENS = "itens",
}

export const RESOURCE_ENDPOINTS: Record<ResourceType, string> = {
  [ResourceType.DEMANDAS]: "/demandas",
  [ResourceType.ITENS]: "/items",
};

export interface PaginationInfo {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationInfo;
}

export interface CrudHooksConfig<TEntity> {
  resource: ResourceType;
  idKey?: keyof TEntity;
}

export interface CrudHooks<TEntity, TCreateDTO, TUpdateDTO> {
  useList: (
    page?: number,
    pageSize?: number
  ) => UseQueryResult<PaginatedResponse<TEntity>, Error>;
  useDetail: (id: string | number) => UseQueryResult<TEntity, Error>;
  useCreate: () => UseMutationResult<TEntity, Error, TCreateDTO>;
  useUpdate: () => UseMutationResult<
    TEntity,
    Error,
    { id: string | number; data: TUpdateDTO }
  >;
  useDelete: () => UseMutationResult<void, Error, string | number>;
}
