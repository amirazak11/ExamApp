"use client"

import { useMemo, useState } from "react"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { Input } from "@/components/ui/input"
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
  data?: TData[]
  columns?: AdminTableColumn<TData>[]
  getRowKey?: (row: TData, index: number) => string
  searchValue?: string
  onSearchChange?: (value: string) => void
  searchPlaceholder?: string
  searchPredicate?: (row: TData, query: string) => boolean
  rowPredicate?: (row: TData) => boolean
  emptyMessage?: string
  page: number
  totalPages?: number
  total: number
  limit: number
  onPageChange?: (page: number) => void
  children?: React.ReactNode
  className?: string
  toolbarAction?: React.ReactNode
  filterVariant?: "default" | "panel"
  filterControls?: React.ReactNode
  filterFooter?: React.ReactNode
  filtersHidden?: boolean
  onFiltersHiddenChange?: (hidden: boolean) => void
}

export function AdminDataTable<TData>({
  data,
  columns,
  getRowKey,
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search...",
  searchPredicate,
  rowPredicate,
  emptyMessage = "No records found.",
  page,
  totalPages,
  total,
  limit,
  onPageChange,
  children,
  className,
  toolbarAction,
  filterVariant = "default",
  filterControls,
  filterFooter,
  filtersHidden,
  onFiltersHiddenChange,
}: AdminDataTableProps<TData>) {
  const [internalSearch, setInternalSearch] = useState("")
  const [internalFiltersHidden, setInternalFiltersHidden] = useState(false)
  const search = searchValue ?? internalSearch
  const setSearch = onSearchChange ?? setInternalSearch
  const hidden = filtersHidden ?? internalFiltersHidden
  const setHidden = onFiltersHiddenChange ?? setInternalFiltersHidden

  const rows = useMemo(() => {
    if (!data) return []
    const query = search.trim().toLowerCase()
    const searchedRows =
      !query || !searchPredicate
        ? data
        : data.filter((row) => searchPredicate(row, query))

    if (!rowPredicate) return searchedRows
    return searchedRows.filter(rowPredicate)
  }, [data, rowPredicate, search, searchPredicate])

  const resolvedTotalPages = totalPages ?? Math.ceil(total / limit)
  const pagination = (
    <TablePagination
      page={page}
      totalPages={resolvedTotalPages}
      total={total}
      limit={limit}
      onPageChange={onPageChange ?? (() => {})}
      borderless={filterVariant === "panel"}
    />
  )

  return (
    <div className={cn("flex flex-col gap-4 h-[calc(100vh-180px)] overflow-auto", className)}>
      {filterVariant === "panel" && (
        <div className="flex items-center justify-between gap-4">
          {pagination}
          {toolbarAction}
        </div>
      )}

      <div className="bg-white border border-gray-200 ">
        <div
          className={cn(
            "flex items-center justify-between gap-2 px-4 py-3 border-b",
            filterVariant === "panel"
              ? "bg-blue-600 border-blue-600 text-white"
              : "border-gray-100"
          )}
        >
          <div className="flex items-center gap-2">
            {filterVariant === "panel" && <SlidersHorizontal className="size-4" />}
            <span
              className={cn(
                "text-sm font-medium",
                filterVariant === "panel" ? "text-white" : "text-blue-600"
              )}
            >
              Search &amp; Filters
            </span>
          </div>
          {filterVariant === "panel" && (
            <button
              type="button"
              onClick={() => setHidden(!hidden)}
              className="inline-flex items-center gap-1 text-xs text-white/90 transition-colors hover:text-white"
            >
              <X className="size-3" />
              {hidden ? "Show" : "Hide"}
            </button>
          )}
        </div>
        {!hidden && (
        <div className={cn("p-3", filterVariant === "panel" && "space-y-3")}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder={searchPlaceholder}
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="h-9 rounded-none border-gray-200 pl-9 focus-visible:border-blue-400"
            />
          </div>
          {filterControls}
          {filterFooter}
        </div>
        )}
      </div>

      <div className="bg-white border border-gray-200">
        {filterVariant === "default" && pagination}

        {columns && data ? (
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHead
                    key={column.key}
                    className={column.headClassName}
                  >
                    {column.header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.length === 0 ? (
                <EmptyTableRow
                  colSpan={columns.length}
                  message={emptyMessage}
                />
              ) : (
                rows.map((row, index) => (
                  <TableRow key={getRowKey?.(row, index) ?? String(index)}>
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
        ) : (
          children
        )}
      </div>
    </div>
  )
}
