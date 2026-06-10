"use client"

import { Logs } from "lucide-react"
import { AppBreadcrumb } from "@/app/(dashboard)/@user/(diplomas)/_components/shared/breadcremb"
import { Header } from "@/app/(dashboard)/@user/(diplomas)/_components/shared/header"
import { useAdminAuditLog } from "@/features/admin/_hooks/audit-logs/hooks"
import type { IAuditLog } from "@/features/audit/types/audit-log"
import { SectionCard } from "../../../_components/shared/section-card"

type AuditLogDetailProps = {
  id: string
}

const statusBadge: Record<IAuditLog["status"], string> = {
  success: "bg-emerald-100 text-emerald-700",
  warning: "bg-amber-100 text-amber-700",
  error: "bg-red-100 text-red-700",
}

export function AuditLogDetail({ id }: AuditLogDetailProps) {
  const { data: log, isLoading, isError } = useAdminAuditLog(id)

  if (isLoading) return <div className="p-6">Loading...</div>

  if (isError || !log) {
    return (
      <>
        <AppBreadcrumb
          items={[
            { label: "Audit Log", href: "/audit-log" },
            { label: "Not found" },
          ]}
        />
        <div className="p-6">
          <p className="text-gray-500 text-sm">Audit log entry not found.</p>
        </div>
      </>
    )
  }

  const rows: { label: string; value: React.ReactNode }[] = [
    {
      label: "Action",
      value: <span className="font-mono text-blue-600 text-sm">{log.action}</span>,
    },
    {
      label: "Entity",
      value: (
        <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5">
          {log.entity}
        </span>
      ),
    },
    {
      label: "Entity ID",
      value: <span className="font-mono text-xs text-gray-600">{log.entityId}</span>,
    },
    { label: "User", value: log.userName },
    {
      label: "User ID",
      value: <span className="font-mono text-xs text-gray-600">{log.userId}</span>,
    },
    { label: "Description", value: log.description },
    {
      label: "Status",
      value: (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium ${
            statusBadge[log.status]
          }`}
        >
          {log.status}
        </span>
      ),
    },
    { label: "Date", value: new Date(log.createdAt).toLocaleString() },
  ]

  return (
    <>
      <AppBreadcrumb
        items={[{ label: "Audit Log", href: "/audit-log" }, { label: log.action }]}
      />
      <div className="p-6 space-y-4">
        <Header title="Audit Log Entry" icon={Logs} backbutton />
        <SectionCard title="Log Details">
          <div className="divide-y divide-gray-100">
            {rows.map(({ label, value }) => (
              <div key={label} className="flex gap-4 px-6 py-3">
                <span className="w-32 shrink-0 text-xs font-medium text-gray-500 uppercase tracking-wide pt-0.5">
                  {label}
                </span>
                <span className="text-gray-800 text-sm">{value}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </>
  )
}
