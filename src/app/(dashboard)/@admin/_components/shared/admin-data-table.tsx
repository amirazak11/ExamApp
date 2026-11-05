"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { EmptyTableRow } from "./empty-table-row"
import { TablePagination } from "./table-pagination"

export type AdminTableColumn<TData> = {
  key: string
  header: React.ReactNode
  cell: (row: TData, index: number) => React.ReactNode
  className?: string
  headClassName?: string
}

type AdminDataTableProps<TData> = {
  data: TData[]
  columns: AdminTableColumn<TData>[]
  getRowKey: (row: TData) => string
  emptyMessage?: string
  page: number
  totalPages: number
  total: number
  limit: number
  onPageChange: (page: number) => void
  toolbarAction?: React.ReactNode
  filters?: React.ReactNode
}

export function AdminDataTable<TData>({
  data,
  columns,
  getRowKey,
  emptyMessage = "No records found.",
  page,
  totalPages,
  total,
  limit,
  onPageChange,
  toolbarAction,
  filters,
}: AdminDataTableProps<TData>) {
  return (
    <div className="space-y-4 p-6">
      <div className="flex items-center justify-between gap-4">
        <TablePagination
          page={page}
          totalPages={totalPages}
          total={total}
          limit={limit}
          onPageChange={onPageChange}
        />
        {toolbarAction}
      </div>

      {filters}

      <div className="bg-white">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              {columns.map((column) => (
                <TableHead
                  key={column.key}
                  className={cn("normal-case tracking-normal", column.headClassName)}
                >
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <EmptyTableRow colSpan={columns.length} message={emptyMessage} />
            ) : (
              data.map((row, index) => (
                <TableRow key={getRowKey(row)}>
                  {columns.map((column) => (
                    <TableCell key={column.key} className={column.className}>
                      {column.cell(row, index)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
