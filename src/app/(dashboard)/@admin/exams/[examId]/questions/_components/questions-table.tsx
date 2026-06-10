"use client"

import { useState } from "react"
import { CheckCircle2 } from "lucide-react"
import type { IQuestion } from "@/features/questions/types/questions"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ActionButtons } from "../../../../_components/shared/action-buttons"
import { AdminDataTable } from "../../../../_components/shared/admin-data-table"
import { EmptyTableRow } from "../../../../_components/shared/empty-table-row"
import { useDeleteAdminQuestion } from "@/features/admin/_hooks/questions/hooks"

interface QuestionsTableProps {
  questions: IQuestion[]
  examId: string
  total: number
  page: number
  limit: number
}

export function QuestionsTable({
  questions,
  examId,
  total,
  page,
  limit,
}: QuestionsTableProps) {
  const { mutateAsync: deleteQuestion } = useDeleteAdminQuestion()
  const [search, setSearch] = useState("")

  const filtered = questions.filter((q) =>
    q.text.toLowerCase().includes(search.toLowerCase())
  )

  const totalPages = Math.ceil(total / limit)

  return (
    <AdminDataTable
      searchValue={search}
      onSearchChange={setSearch}
      searchPlaceholder="Search questions..."
      page={page}
      totalPages={totalPages}
      total={total}
      limit={limit}
    >
      <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-8">#</TableHead>
              <TableHead>Question</TableHead>
              <TableHead className="w-24">Answers</TableHead>
              <TableHead className="w-28 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <EmptyTableRow colSpan={4} message="No questions found." />
            ) : (
              filtered.map((question, idx) => (
                <TableRow key={question.id}>
                  <TableCell className="text-gray-400 text-xs">{idx + 1}</TableCell>
                  <TableCell className="text-gray-800 font-medium max-w-lg">
                    <p className="line-clamp-2">{question.text}</p>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <CheckCircle2 className="size-3.5 text-emerald-500" />
                      {question.answers.length}
                    </div>
                  </TableCell>
                <TableCell>
                  <ActionButtons
                    viewHref={`/exams/${examId}/questions/${question.id}`}
                    editHref={`/exams/${examId}/questions/${question.id}/edit`}
                    onDelete={async () => {
                      await deleteQuestion(question.id)
                    }}
                    disabledDelete={question.immutable}
                    disabledDeleteTooltip="Only super admin can delete immutable questions"
                  />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
    </AdminDataTable>
  )
}
