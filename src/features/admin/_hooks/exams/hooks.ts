"use client"

import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseQueryOptions,
} from "@tanstack/react-query"
import {
  createAdminExam,
  deleteAdminExam,
  fetchAdminExam,
  fetchAdminExams,
  setAdminImmutable,
  updateAdminExam,
} from "../../apis/admin.fetch"
import type { IAdminExamPayload } from "../../types/admin"
import {
  adminQueryKeys,
  type ImmutableVariables,
  type PaginationOptions,
} from "../shared"

export function useAdminExams(
  options: PaginationOptions = {},
  queryOptions?: Omit<
    UseQueryOptions<Awaited<ReturnType<typeof fetchAdminExams>>, Error>,
    "queryKey" | "queryFn"
  >
) {
  return useQuery({
    queryKey: adminQueryKeys.exams(options),
    queryFn: () => fetchAdminExams(options),
    ...queryOptions,
  })
}

export function useAdminExam(id: string) {
  return useQuery({
    queryKey: adminQueryKeys.exam(id),
    queryFn: () => fetchAdminExam(id),
    enabled: !!id,
  })
}

export function useCreateAdminExam() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createAdminExam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminQueryKeys.all })
      queryClient.invalidateQueries({ queryKey: ["exams"] })
    },
  })
}

export function useUpdateAdminExam() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      fields,
    }: {
      id: string
      fields: IAdminExamPayload
    }) => updateAdminExam(id, fields),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminQueryKeys.all })
      queryClient.invalidateQueries({ queryKey: ["exams"] })
    },
  })
}

export function useDeleteAdminExam() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteAdminExam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminQueryKeys.all })
      queryClient.invalidateQueries({ queryKey: ["exams"] })
    },
  })
}

export function useSetAdminExamImmutable() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, immutable }: ImmutableVariables) =>
      setAdminImmutable(`/api/admin/exams/${id}/immutable`, { immutable }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminQueryKeys.all })
      queryClient.invalidateQueries({ queryKey: ["exams"] })
    },
  })
}
