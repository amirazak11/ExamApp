"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { Clock, HelpCircle, Plus } from "lucide-react"
import type { IExam } from "@/lib/types/comment"
import { Button } from "@/components/ui/button"
import {
  AdminDataTable,
  type AdminTableColumn,
} from "../../_components/shared/admin-data-table"
import { ActionButtons } from "../../_components/shared/action-buttons"
import { useDeleteAdminExam } from "@/features/admin/_hooks/exams/hooks"

type ExamsTableProps = {
  exams: IExam[]
  total: number
  page: number
  limit: number
}

export function ExamsTable({ exams, total, page, limit }: ExamsTableProps) {
  const { mutateAsync: deleteExam } = useDeleteAdminExam()
  const [draftTitle, setDraftTitle] = useState("")
  const [draftDiploma, setDraftDiploma] = useState("")
  const [draftImmutability, setDraftImmutability] = useState("")
  const [filters, setFilters] = useState({
    title: "",
    diploma: "",
    immutability: "",
  })

  const diplomaOptions = useMemo(
    () => Array.from(new Set(exams.map((exam) => exam.diplomaId))).filter(Boolean),
    [exams]
  )

  const columns: AdminTableColumn<IExam>[] = [
    {
      key: "title",
      header: "Title",
      className: "font-medium text-gray-800",
      cell: (exam) => exam.title,
    },
    {
      key: "diploma",
      header: "Diploma",
      className: "text-gray-500 text-xs",
      cell: (exam) => exam.diplomaId,
    },
    {
      key: "questions",
      header: "Questions",
      headClassName: "w-32",
      cell: (exam) => (
        <div className="flex items-center gap-1.5 text-gray-600 text-sm">
          <HelpCircle className="size-3.5 text-gray-400" />
          {exam.questionsCount ?? 0}
        </div>
      ),
    },
    {
      key: "duration",
      header: "Duration",
      headClassName: "w-32",
      cell: (exam) => (
        <div className="flex items-center gap-1.5 text-gray-600 text-sm">
          <Clock className="size-3.5 text-gray-400" />
          {exam.duration} min
        </div>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      headClassName: "w-28 text-right",
      cell: (exam) => (
        <ActionButtons
          viewHref={`/exams/${exam.id}`}
          editHref={`/exams/${exam.id}/edit`}
          addQuestionHref={`/exams/${exam.id}/questions/new`}
          onDelete={async () => {
            await deleteExam(exam.id)
          }}
          disabledDelete={exam.immutable}
          disabledDeleteTooltip="Only super admin can delete immutable exams"
        />
      ),
    },
  ]

  const filterControls = (
    <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)]">
      <select
        value={draftDiploma}
        onChange={(event) => setDraftDiploma(event.target.value)}
        className="h-9 rounded-none border border-gray-200 bg-white px-3 text-xs text-gray-500 outline-none transition-colors focus:border-blue-400"
        aria-label="Diploma"
      >
        <option value="">Diploma</option>
        {diplomaOptions.map((diplomaId) => (
          <option key={diplomaId} value={diplomaId}>
            {diplomaId}
          </option>
        ))}
      </select>
      <select
        value={draftImmutability}
        onChange={(event) => setDraftImmutability(event.target.value)}
        className="h-9 rounded-none border border-gray-200 bg-white px-3 text-xs text-gray-500 outline-none transition-colors focus:border-blue-400"
        aria-label="Immutability"
      >
        <option value="">Immutability</option>
        <option value="immutable">Immutable</option>
        <option value="mutable">Mutable</option>
      </select>
    </div>
  )

  const filterFooter = (
    <div className="flex justify-end gap-3 pt-1">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="rounded-none px-6 text-xs"
        onClick={() => {
          setDraftTitle("")
          setDraftDiploma("")
          setDraftImmutability("")
          setFilters({ title: "", diploma: "", immutability: "" })
        }}
      >
        Clear
      </Button>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="rounded-none border-gray-200 bg-gray-100 px-6 text-xs hover:bg-gray-200"
        onClick={() =>
          setFilters({
            title: draftTitle,
            diploma: draftDiploma,
            immutability: draftImmutability,
          })
        }
      >
        Apply
      </Button>
    </div>
  )

  return (
    <AdminDataTable
      data={exams}
      columns={columns}
      getRowKey={(exam) => exam.id}
      searchValue={draftTitle}
      onSearchChange={setDraftTitle}
      searchPlaceholder="Search by title"
      searchPredicate={() => true}
      rowPredicate={(exam) => {
        const matchesTitle =
          !filters.title ||
          exam.title.toLowerCase().includes(filters.title.trim().toLowerCase())
        const matchesDiploma =
          !filters.diploma || exam.diplomaId === filters.diploma
        const matchesImmutability =
          !filters.immutability ||
          (filters.immutability === "immutable" ? exam.immutable : !exam.immutable)

        return matchesTitle && matchesDiploma && matchesImmutability
      }}
      emptyMessage="No exams found."
      page={page}
      totalPages={Math.ceil(total / limit)}
      total={total}
      limit={limit}
      filterVariant="panel"
      filterControls={filterControls}
      filterFooter={filterFooter}
      toolbarAction={
        <Button
          className="rounded-none gap-2 bg-emerald-500 hover:bg-emerald-600 shrink-0"
          asChild
        >
          <Link href="/exams/new">
            <Plus className="size-4" />
            Create New Exam
          </Link>
        </Button>
      }
    />
  )
}
