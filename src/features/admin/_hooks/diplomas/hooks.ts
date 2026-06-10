"use client"

import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseQueryOptions,
} from "@tanstack/react-query"
import {
  createAdminDiploma,
  deleteAdminDiploma,
  fetchAdminDiploma,
  fetchAdminDiplomas,
  setAdminImmutable,
  updateAdminDiploma,
} from "../../apis/admin.fetch"
import type { IAdminDiplomaPayload } from "../../types/admin"
import {
  adminQueryKeys,
  type ImmutableVariables,
  type PaginationOptions,
} from "../shared"

export function useAdminDiplomas(
  options: PaginationOptions = {},
  queryOptions?: Omit<
    UseQueryOptions<Awaited<ReturnType<typeof fetchAdminDiplomas>>, Error>,
    "queryKey" | "queryFn"
  >
) {
  return useQuery({
    queryKey: adminQueryKeys.diplomas(options),
    queryFn: () => fetchAdminDiplomas(options),
    ...queryOptions,
  })
}

export function useAdminDiploma(id: string) {
  return useQuery({
    queryKey: adminQueryKeys.diploma(id),
    queryFn: () => fetchAdminDiploma(id),
    enabled: !!id,
  })
}

export function useCreateAdminDiploma() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createAdminDiploma,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminQueryKeys.all })
      queryClient.invalidateQueries({ queryKey: ["diplomas"] })
    },
  })
}

export function useUpdateAdminDiploma() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      fields,
    }: {
      id: string
      fields: IAdminDiplomaPayload
    }) => updateAdminDiploma(id, fields),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminQueryKeys.all })
      queryClient.invalidateQueries({ queryKey: ["diplomas"] })
    },
  })
}

export function useDeleteAdminDiploma() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteAdminDiploma,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminQueryKeys.all })
      queryClient.invalidateQueries({ queryKey: ["diplomas"] })
    },
  })
}

export function useSetAdminDiplomaImmutable() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, immutable }: ImmutableVariables) =>
      setAdminImmutable(`/api/admin/diplomas/${id}/immutable`, { immutable }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminQueryKeys.all })
      queryClient.invalidateQueries({ queryKey: ["diplomas"] })
    },
  })
}
