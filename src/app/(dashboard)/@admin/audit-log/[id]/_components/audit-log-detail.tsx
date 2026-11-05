"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { ExternalLink, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  useAdminAuditLog,
  useDeleteAdminAuditLog,
} from "@/features/admin/_hooks/audit-logs/hooks"
import { ConfirmDialog } from "../../../_components/shared/confirm-dialog"
import { DetailField } from "../../../_components/shared/detail-field"
import { PageHeader } from "../../../_components/shared/page-header"
import {
  ACTION_CLASSES,
  capitalize,
  formatDate,
  formatTime,
  getEntityHref,
  ROLE_CLASSES,
  ROLE_LABELS,
} from "../../_components/audit-format"

type AuditLogDetailProps = {
  id: string
}

export function AuditLogDetail({ id }: AuditLogDetailProps) {
  const router = useRouter()
  const { data: log, isLoading, isError } = useAdminAuditLog(id)
  const { mutate: deleteLog } = useDeleteAdminAuditLog()

  if (isLoading) return <div className="p-6">Loading...</div>

  if (isError || !log) {
    return (
      <>
        <PageHeader
          breadcrumbs={[
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

  const title = `${capitalize(log.entityType)} ${capitalize(log.action)} By ${log.actorUsername}`
  const entityLabel = `${capitalize(log.entityType)}: ${log.entityId ?? "-"}`
  const entityHref = getEntityHref(log)
  const entity = entityHref ? (
    <Link href={entityHref} className="inline-flex items-center gap-1 underline">
      {entityLabel}
      <ExternalLink className="size-3" />
    </Link>
  ) : (
    entityLabel
  )
  const updatedFields = Object.keys(log.metadata ?? {})

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "Audit Log", href: "/audit-log" }, { label: title }]}
        title={title}
        subtitle={<>Entity: {entity}</>}
        actions={
          <ConfirmDialog
            title="Are you sure you want to delete this log?"
            onConfirm={() =>
              deleteLog(id, { onSuccess: () => router.push("/audit-log") })
            }
            trigger={
              <Button className="rounded-none gap-2 bg-red-600 text-white hover:bg-red-700">
                <Trash2 className="size-4" />
                Delete
              </Button>
            }
          />
        }
      />

      <div className="p-6">
        <div className="space-y-4 bg-white p-4">
          <DetailField label="Action">
            <span className={`font-semibold ${ACTION_CLASSES[log.action]}`}>
              {log.action}
            </span>
          </DetailField>
          <DetailField label="Method">{log.httpMethod ?? "-"}</DetailField>
          <DetailField label="User">
            <p>{log.actorUsername}</p>
            <div className="text-xs text-gray-500">
              <p>Email: {log.actorEmail}</p>
              <p>IP Address: {log.ipAddress ?? "-"}</p>
              <p>
                Role:{" "}
                <span className={ROLE_CLASSES[log.actorRole]}>
                  {ROLE_LABELS[log.actorRole]}
                </span>
              </p>
            </div>
          </DetailField>
          <DetailField label="Entity">{entity}</DetailField>
          <DetailField label="Date & Time">
            {formatTime(log.createdAt)} | {formatDate(log.createdAt)}
          </DetailField>
          {updatedFields.length > 0 && (
            <>
              <DetailField label="Updated Fields">
                {updatedFields.join(", ")}
              </DetailField>
              <DetailField label="Metadata">
                <pre className="overflow-x-auto bg-gray-200 p-3 font-mono text-xs">
                  {JSON.stringify(log.metadata, null, 2)}
                </pre>
              </DetailField>
            </>
          )}
        </div>
      </div>
    </>
  )
}
