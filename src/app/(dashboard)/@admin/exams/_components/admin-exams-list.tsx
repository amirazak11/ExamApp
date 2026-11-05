"use client"

import Link from "next/link"
import { Plus } from "lucide-react"
import { keepPreviousData } from "@tanstack/react-query"
import type { IExam } from "@/lib/types/comment"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAdminDiplomas } from "@/features/admin/_hooks/diplomas/hooks"
import {
  useAdminExams,
  useDeleteAdminExam,
} from "@/features/admin/_hooks/exams/hooks"
import { ActionButtons } from "../../_components/shared/action-buttons"
import {
  AdminDataTable,
  type AdminTableColumn,
} from "../../_components/shared/admin-data-table"
import { AdminSelect } from "../../_components/shared/admin-select"
import { FilterPanel } from "../../_components/shared/filter-panel"
import { SortMenu } from "../../_components/shared/sort-menu"
import { TableImage } from "../../_components/shared/table-image"
import { useTableState } from "../../_components/shared/use-table-state"

const EMPTY_FILTERS = { search: "", diplomaId: "", immutable: "" }

const SORT_OPTIONS = [
  { value: "createdAt:desc", label: "Newest" },
  { value: "createdAt:asc", label: "Oldest" },
  { value: "title:asc", label: "Title (A-Z)" },
  { value: "title:desc", label: "Title (Z-A)" },
  { value: "questions:desc", label: "Most questions" },
  { value: "questions:asc", label: "Fewest questions" },
]

const IMMUTABILITY_OPTIONS = [
  { value: "true", label: "Immutable" },
  { value: "false", label: "Mutable" },
]

export function AdminExamsList() {
  const table = useTableState(EMPTY_FILTERS, 20)
  const { data, isLoading, isError } = useAdminExams(table.query, {
    placeholderData: keepPreviousData,
  })
  const { data: diplomas } = useAdminDiplomas({ limit: 100 })
  const { mutate: deleteExam } = useDeleteAdminExam()

  const columns: AdminTableColumn<IExam>[] = [
    {
      key: "image",
      header: "Image",
      headClassName: "w-20",
      cell: (exam) => <TableImage image={exam.image} alt={exam.title} />,
    },
    {
      key: "title",
      header: "Title",
      className: "font-medium text-gray-800",
      cell: (exam) => exam.title,
    },
    {
      key: "diploma",
      header: "Diploma",
      headClassName: "w-48",
      className: "text-gray-500",
      cell: (exam) => (
        <p className="max-w-40 truncate" title={exam.diploma?.title}>
          {exam.diploma?.title ?? "-"}
        </p>
      ),
    },
    {
      key: "questions",
      header: "No. of Questions",
      headClassName: "w-36",
      className: "text-gray-600",
      cell: (exam) => exam.questionsCount ?? 0,
    },
    {
      key: "actions",
      header: (
        <SortMenu value={table.sort} options={SORT_OPTIONS} onChange={table.setSort} />
      ),
      headClassName: "w-24",
      cell: (exam) => (
        <ActionButtons
          viewHref={`/exams/${exam.id}`}
          editHref={`/exams/${exam.id}/edit`}
          onDelete={() => deleteExam(exam.id)}
          deleteTitle={`Are you sure you want to delete "${exam.title}"?`}
          immutable={exam.immutable}
        />
      ),
    },
  ]

  return (
    <AdminDataTable
      data={data?.exams ?? []}
      columns={columns}
      getRowKey={(exam) => exam.id}
      emptyMessage={
        isLoading ? "Loading..." : isError ? "Something went wrong" : "No exams found."
      }
      page={table.page}
      totalPages={data?.metadata?.totalPages ?? 1}
      total={data?.total ?? 0}
      limit={table.query.limit}
      onPageChange={table.setPage}
      toolbarAction={
        <Button
          className="rounded-none gap-2 bg-emerald-500 text-white hover:bg-emerald-600 shrink-0"
          asChild
        >
          <Link href="/exams/new">
            <Plus className="size-4" />
            Create New Exam
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
          <div className="grid gap-3 md:grid-cols-2">
            <AdminSelect
              placeholder="Diploma"
              options={(diplomas?.data ?? []).map((diploma) => ({
                value: diploma.id,
                label: diploma.title,
              }))}
              value={table.draft.diplomaId}
              onChange={(event) => table.setDraftField("diplomaId", event.target.value)}
            />
            <AdminSelect
              placeholder="Immutability"
              options={IMMUTABILITY_OPTIONS}
              value={table.draft.immutable}
              onChange={(event) => table.setDraftField("immutable", event.target.value)}
            />
          </div>
        </FilterPanel>
      }
    />
  )
}
