import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";
import {
  RESOURCE_ENDPOINTS,
  type CrudHooksConfig,
  type CrudHooks,
  type PaginatedResponse,
} from "@/types/crud";

export function createCrudHooks<TEntity, TCreateDTO, TUpdateDTO>(
  config: CrudHooksConfig<TEntity>
): CrudHooks<TEntity, TCreateDTO, TUpdateDTO> {
  const { resource } = config;
  const endpoint = RESOURCE_ENDPOINTS[resource];

  // Query Keys
  const keys = {
    all: [resource] as const,
    list: (page: number, pageSize: number) => [resource, "list", page, pageSize] as const,
    detail: (id: string | number) => [resource, id] as const,
  };

  return {
    // List all entities with pagination
    useList: (page: number = 1, pageSize: number = 20) => {
      return useQuery({
        queryKey: keys.list(page, pageSize),
        queryFn: () =>
          fetcher<PaginatedResponse<TEntity>>(
            `${endpoint}?page=${page}&pageSize=${pageSize}`
          ),
      });
    },

    // Find entity by ID
    useDetail: (id: string | number) => {
      return useQuery({
        queryKey: keys.detail(id),
        queryFn: () => fetcher<TEntity>(`${endpoint}/${id}`),
        enabled: !!id,
      });
    },

    // Create entity
    useCreate: () => {
      const queryClient = useQueryClient();

      return useMutation({
        mutationFn: (data: TCreateDTO) =>
          fetcher<TEntity>(endpoint, {
            method: "POST",
            body: JSON.stringify(data),
          }),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: keys.all });
        },
      });
    },

    // Update entity
    useUpdate: () => {
      const queryClient = useQueryClient();

      return useMutation({
        mutationFn: ({ id, data }: { id: string | number; data: TUpdateDTO }) =>
          fetcher<TEntity>(`${endpoint}/${id}`, {
            method: "PUT",
            body: JSON.stringify(data),
          }),
        onSuccess: (_, variables) => {
          queryClient.invalidateQueries({ queryKey: keys.all });
          queryClient.invalidateQueries({
            queryKey: keys.detail(variables.id),
          });
        },
      });
    },

    // Delete entity
    useDelete: () => {
      const queryClient = useQueryClient();

      return useMutation({
        mutationFn: (id: string | number) =>
          fetcher(`${endpoint}/${id}`, { method: "DELETE" }),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: keys.all });
        },
      });
    },
  };
}
