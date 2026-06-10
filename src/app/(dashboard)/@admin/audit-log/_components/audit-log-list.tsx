"use client"

import { useAdminAuditLogs } from "@/features/admin/_hooks/audit-logs/hooks"
import { AuditLogTable } from "./audit-log-table"

export function AuditLogList() {
  const { data, isLoading, isError } = useAdminAuditLogs({ page: 1, limit: 20 })

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Something went wrong</p>

  return (
    <AuditLogTable
      logs={data?.data ?? []}
      total={data?.total ?? 0}
      page={data?.metadata?.page ?? 1}
      limit={data?.metadata?.limit ?? 20}
    />
  )
}
