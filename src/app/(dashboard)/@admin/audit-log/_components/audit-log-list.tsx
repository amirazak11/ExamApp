"use client"

import Link from "next/link"
import { ExternalLink, Trash2 } from "lucide-react"
import { keepPreviousData } from "@tanstack/react-query"
import type { IAuditLog } from "@/features/audit/types/audit-log"
import { Button } from "@/components/ui/button"
import {
  useAdminAuditLogs,
  useClearAdminAuditLogs,
  useDeleteAdminAuditLog,
} from "@/features/admin/_hooks/audit-logs/hooks"
import { useAdminUsers } from "@/features/admin/_hooks/users/hooks"
import { useIsSuperAdmin } from "@/features/admin/_hooks/use-is-super-admin"
import { ActionButtons } from "../../_components/shared/action-buttons"
import {
  AdminDataTable,
  type AdminTableColumn,
} from "../../_components/shared/admin-data-table"
import { AdminSelect } from "../../_components/shared/admin-select"
import { ConfirmDialog } from "../../_components/shared/confirm-dialog"
import { FilterPanel } from "../../_components/shared/filter-panel"
import { SortMenu } from "../../_components/shared/sort-menu"
import { useTableState } from "../../_components/shared/use-table-state"
import {
  ACTION_CLASSES,
  capitalize,
  formatDate,
  formatTime,
  getEntityHref,
  ROLE_CLASSES,
  ROLE_LABELS,
} from "./audit-format"

const EMPTY_FILTERS = { category: "", action: "", actorUserId: "" }

const SORT_OPTIONS = [
  { value: "createdAt:desc", label: "Newest" },
  { value: "createdAt:asc", label: "Oldest" },
  { value: "action:asc", label: "Action" },
  { value: "user:asc", label: "User" },
  { value: "entity:asc", label: "Entity" },
]

const toOptions = (values: string[]) =>
  values.map((value) => ({ value, label: capitalize(value).replace("_", " ") }))

const CATEGORY_OPTIONS = toOptions(["DIPLOMA", "EXAM", "QUESTION", "USER", "SYSTEM"])
const ACTION_OPTIONS = toOptions([
  "CREATE",
  "UPDATE",
  "DELETE",
  "SET_IMMUTABLE",
  "SEED_DATA",
])

export function AuditLogList() {
  const table = useTableState(EMPTY_FILTERS, 20)
  const { data, isLoading, isError } = useAdminAuditLogs(table.query, {
    placeholderData: keepPreviousData,
  })
  const { data: users } = useAdminUsers({ limit: 100 })
  const { mutate: deleteLog } = useDeleteAdminAuditLog()
  const { mutate: clearLogs } = useClearAdminAuditLogs()
  const isSuperAdmin = useIsSuperAdmin()

  const columns: AdminTableColumn<IAuditLog>[] = [
    {
      key: "action",
      header: "Action",
      headClassName: "w-32",
      cell: (log) => (
        <>
          <p className={`text-xs font-semibold ${ACTION_CLASSES[log.action]}`}>
            {log.action}
          </p>
          <p className="text-xs text-gray-400">Method: {log.httpMethod ?? "-"}</p>
        </>
      ),
    },
    {
      key: "user",
      header: "User",
      cell: (log) => (
        <>
          <p className="text-xs font-medium text-gray-800">{log.actorUsername}</p>
          <p className="text-xs text-gray-400">{log.actorEmail}</p>
          <p className={`text-xs ${ROLE_CLASSES[log.actorRole]}`}>
            {ROLE_LABELS[log.actorRole]}
          </p>
        </>
      ),
    },
    {
      key: "entity",
      header: "Entity",
      cell: (log) => {
        const href = getEntityHref(log)

        return (
          <>
            <p className="text-xs font-medium text-gray-800">
              {capitalize(log.entityType)}
            </p>
            {href ? (
              <Link
                href={href}
                className="inline-flex items-center gap-1 text-xs text-gray-400 underline"
              >
                {log.entityId}
                <ExternalLink className="size-3" />
              </Link>
            ) : (
              <p className="text-xs text-gray-400">{log.entityId}</p>
            )}
          </>
        )
      },
    },
    {
      key: "time",
      header: "Time",
      headClassName: "w-48",
      cell: (log) => (
        <>
          <p className="text-xs text-gray-800">{formatTime(log.createdAt)}</p>
          <p className="text-xs text-gray-400">{formatDate(log.createdAt)}</p>
        </>
      ),
    },
    {
      key: "actions",
      header: (
        <SortMenu value={table.sort} options={SORT_OPTIONS} onChange={table.setSort} />
      ),
      headClassName: "w-24",
      cell: (log) => (
        <ActionButtons
          viewHref={`/audit-log/${log.id}`}
          onDelete={() => deleteLog(log.id)}
          deleteTitle="Are you sure you want to delete this log?"
        />
      ),
    },
  ]

  return (
    <AdminDataTable
      data={data?.data ?? []}
      columns={columns}
      getRowKey={(log) => log.id}
      emptyMessage={
        isLoading
          ? "Loading..."
          : isError
            ? "Something went wrong"
            : "No audit logs found."
      }
      page={table.page}
      totalPages={data?.metadata?.totalPages ?? 1}
      total={data?.total ?? 0}
      limit={table.query.limit}
      onPageChange={table.setPage}
      toolbarAction={
        isSuperAdmin && (
          <ConfirmDialog
            title="Are you sure you want to clear all logs?"
            confirmLabel="Yes, Clear"
            onConfirm={() => clearLogs()}
            trigger={
              <Button className="rounded-none gap-2 bg-red-600 text-white hover:bg-red-700 shrink-0">
                <Trash2 className="size-4" />
                Clear All Logs
              </Button>
            }
          />
        )
      }
      filters={
        <FilterPanel onClear={table.clear} onApply={table.apply}>
          <div className="grid gap-3 md:grid-cols-3">
            <AdminSelect
              placeholder="Category"
              options={CATEGORY_OPTIONS}
              value={table.draft.category}
              onChange={(event) => table.setDraftField("category", event.target.value)}
            />
            <AdminSelect
              placeholder="Action"
              options={ACTION_OPTIONS}
              value={table.draft.action}
              onChange={(event) => table.setDraftField("action", event.target.value)}
            />
            <AdminSelect
              placeholder="User"
              options={(users?.users ?? []).map((user) => ({
                value: user.id,
                label: user.username,
              }))}
              value={table.draft.actorUserId}
              onChange={(event) =>
                table.setDraftField("actorUserId", event.target.value)
              }
            />
          </div>
        </FilterPanel>
      }
    />
  )
}
