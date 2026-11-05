"use client"

import Link from "next/link"
import { Plus } from "lucide-react"
import { keepPreviousData } from "@tanstack/react-query"
import type { IDiploma } from "@/lib/types/IDiploma"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  useAdminDiplomas,
  useDeleteAdminDiploma,
} from "@/features/admin/_hooks/diplomas/hooks"
import { ActionButtons } from "./shared/action-buttons"
import { AdminDataTable, type AdminTableColumn } from "./shared/admin-data-table"
import { AdminSelect } from "./shared/admin-select"
import { FilterPanel } from "./shared/filter-panel"
import { SortMenu } from "./shared/sort-menu"
import { TableImage } from "./shared/table-image"
import { useTableState } from "./shared/use-table-state"

const EMPTY_FILTERS = { search: "", immutable: "" }

const SORT_OPTIONS = [
  { value: "createdAt:desc", label: "Newest" },
  { value: "createdAt:asc", label: "Oldest" },
  { value: "title:asc", label: "Title (A-Z)" },
  { value: "title:desc", label: "Title (Z-A)" },
]

const IMMUTABILITY_OPTIONS = [
  { value: "true", label: "Immutable" },
  { value: "false", label: "Mutable" },
]

export function AdminDiplomasList() {
  const table = useTableState(EMPTY_FILTERS, 10)
  const { data, isLoading, isError } = useAdminDiplomas(table.query, {
    placeholderData: keepPreviousData,
  })
  const { mutate: deleteDiploma } = useDeleteAdminDiploma()

  const columns: AdminTableColumn<IDiploma>[] = [
    {
      key: "image",
      header: "Image",
      headClassName: "w-20",
      cell: (diploma) => <TableImage image={diploma.image} alt={diploma.title} />,
    },
    {
      key: "title",
      header: "Title",
      headClassName: "w-48",
      className: "font-medium text-gray-800",
      cell: (diploma) => (
        <Tooltip>
          <TooltipTrigger asChild>
            <p className="max-w-40 truncate">{diploma.title}</p>
          </TooltipTrigger>
          <TooltipContent>{diploma.title}</TooltipContent>
        </Tooltip>
      ),
    },
    {
      key: "description",
      header: "Description",
      className: "text-xs text-gray-500 whitespace-normal",
      cell: (diploma) => <p className="line-clamp-3">{diploma.description}</p>,
    },
    {
      key: "actions",
      header: (
        <SortMenu value={table.sort} options={SORT_OPTIONS} onChange={table.setSort} />
      ),
      headClassName: "w-24",
      cell: (diploma) => (
        <ActionButtons
          viewHref={`/${diploma.id}`}
          editHref={`/${diploma.id}/edit`}
          onDelete={() => deleteDiploma(diploma.id)}
          deleteTitle={`Are you sure you want to delete "${diploma.title}"?`}
          immutable={diploma.immutable}
        />
      ),
    },
  ]

  return (
    <TooltipProvider>
      <AdminDataTable
        data={data?.data ?? []}
        columns={columns}
        getRowKey={(diploma) => diploma.id}
        emptyMessage={
          isLoading
            ? "Loading..."
            : isError
              ? "Something went wrong"
              : "No diplomas found."
        }
        page={table.page}
        totalPages={data?.metadata.totalPages ?? 1}
        total={data?.metadata.total ?? 0}
        limit={table.query.limit}
        onPageChange={table.setPage}
        toolbarAction={
          <Button
            className="rounded-none gap-2 bg-emerald-500 text-white hover:bg-emerald-600 shrink-0"
            asChild
          >
            <Link href="/new">
              <Plus className="size-4" />
              Add New Diploma
            </Link>
          </Button>
        }
        filters={
          <FilterPanel onClear={table.clear} onApply={table.apply}>
            <Input
              placeholder="Search by title"
              value={table.draft.search}
              onChange={(event) => table.setDraftField("search", event.target.value)}
            />
            <AdminSelect
              placeholder="Immutability"
              options={IMMUTABILITY_OPTIONS}
              value={table.draft.immutable}
              onChange={(event) => table.setDraftField("immutable", event.target.value)}
            />
          </FilterPanel>
        }
      />
    </TooltipProvider>
  )
}
