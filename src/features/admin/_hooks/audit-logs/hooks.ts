"use client"

import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseQueryOptions,
} from "@tanstack/react-query"
import {
  clearAdminAuditLogs,
  deleteAdminAuditLog,
  fetchAdminAuditLog,
  fetchAdminAuditLogs,
} from "../../apis/admin.fetch"
import { adminQueryKeys, type PaginationOptions } from "../shared"

export function useAdminAuditLogs(
  options: PaginationOptions = {},
  queryOptions?: Omit<
    UseQueryOptions<
      Awaited<ReturnType<typeof fetchAdminAuditLogs>>,
      Error
    >,
    "queryKey" | "queryFn"
  >
) {
  return useQuery({
    queryKey: adminQueryKeys.auditLogs(options),
    queryFn: () => fetchAdminAuditLogs(options),
    ...queryOptions,
  })
}

export function useAdminAuditLog(id: string) {
  return useQuery({
    queryKey: adminQueryKeys.auditLog(id),
    queryFn: () => fetchAdminAuditLog(id),
    enabled: !!id,
  })
}

export function useClearAdminAuditLogs() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: clearAdminAuditLogs,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminQueryKeys.all })
    },
  })
}

export function useDeleteAdminAuditLog() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteAdminAuditLog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminQueryKeys.all })
    },
  })
}
