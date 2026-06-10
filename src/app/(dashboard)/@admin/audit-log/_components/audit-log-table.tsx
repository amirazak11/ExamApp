"use client"

import { useState } from "react"
import Link from "next/link"
import { Eye } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { AdminDataTable } from "../../_components/shared/admin-data-table"
import { EmptyTableRow } from "../../_components/shared/empty-table-row"
import type { IAuditLog } from "@/features/audit/types/audit-log"

const statusClasses: Record<IAuditLog["status"], string> = {
  success: "bg-emerald-100 text-emerald-700",
  warning: "bg-amber-100 text-amber-700",
  error: "bg-red-100 text-red-700",
}

interface AuditLogTableProps {
  logs: IAuditLog[]
  total: number
  page: number
  limit: number
}

export function AuditLogTable({ logs, total, page, limit }: AuditLogTableProps) {
  const [search, setSearch] = useState("")

  const filtered = logs.filter(
    (log) =>
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.userName.toLowerCase().includes(search.toLowerCase()) ||
      log.description.toLowerCase().includes(search.toLowerCase())
  )

  const totalPages = Math.ceil(total / limit)

  return (
    <TooltipProvider>
      <AdminDataTable
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search logs..."
        page={page}
        totalPages={totalPages}
        total={total}
        limit={limit}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Action</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Entity</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="w-36">Status</TableHead>
              <TableHead className="w-36">Date</TableHead>
              <TableHead className="w-16 text-right">View</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <EmptyTableRow
                colSpan={7}
                message="No audit logs found."
                className="py-16"
              />
            ) : (
              filtered.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-mono text-xs font-medium text-blue-600">
                    {log.action}
                  </TableCell>
                  <TableCell className="text-gray-700 text-sm">
                    {log.userName}
                  </TableCell>
                  <TableCell>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5">
                      {log.entity}
                    </span>
                  </TableCell>
                  <TableCell className="text-gray-500 text-sm max-w-xs">
                    <p className="line-clamp-2">{log.description}</p>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2 py-0.5 text-xs font-medium ${
                        statusClasses[log.status] ?? "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {log.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-gray-500 text-xs">
                    {new Date(log.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="text-gray-400 hover:text-blue-600 hover:bg-blue-50"
                          asChild
                        >
                          <Link href={`/audit-log/${log.id}`}>
                            <Eye className="size-4" />
                          </Link>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>View details</TooltipContent>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </AdminDataTable>
    </TooltipProvider>
  )
}
