"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  useAdminQuestionsByExam,
  useDeleteAdminQuestion,
} from "@/features/admin/_hooks/questions/hooks"
import { ActionButtons } from "../../../_components/shared/action-buttons"
import { EmptyTableRow } from "../../../_components/shared/empty-table-row"
import { SectionCard } from "../../../_components/shared/section-card"
import { SortMenu } from "../../../_components/shared/sort-menu"

const SORT_OPTIONS = [
  { value: "createdAt:desc", label: "Newest" },
  { value: "createdAt:asc", label: "Oldest" },
  { value: "title:asc", label: "Title (A-Z)" },
  { value: "title:desc", label: "Title (Z-A)" },
]

type ExamQuestionsSectionProps = {
  examId: string
}

export function ExamQuestionsSection({ examId }: ExamQuestionsSectionProps) {
  const [sort, setSort] = useState(SORT_OPTIONS[0].value)
  const { data: questions = [], isLoading, isError } =
    useAdminQuestionsByExam(examId, sort)
  const { mutate: deleteQuestion } = useDeleteAdminQuestion()
  const emptyMessage = isLoading
    ? "Loading..."
    : isError
      ? "Something went wrong"
      : "No questions found."

  return (
    <SectionCard
      title="Exam Questions"
      actions={
        <Link
          href={`/exams/${examId}/questions/new`}
          className="inline-flex items-center gap-1 text-sm font-medium text-white hover:underline"
        >
          <Plus className="size-4" />
          Add Questions
        </Link>
      }
    >
      <Table>
        <TableHeader className="bg-gray-200">
          <TableRow className="hover:bg-transparent">
            <TableHead className="normal-case tracking-normal text-gray-700">
              Title
            </TableHead>
            <TableHead className="w-24 normal-case tracking-normal text-gray-700">
              <SortMenu value={sort} options={SORT_OPTIONS} onChange={setSort} />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {questions.length === 0 ? (
            <EmptyTableRow colSpan={2} message={emptyMessage} />
          ) : (
            questions.map((question) => (
              <TableRow key={question.id}>
                <TableCell className="text-gray-800">{question.text}</TableCell>
                <TableCell>
                  <ActionButtons
                    viewHref={`/exams/${examId}/questions/${question.id}`}
                    editHref={`/exams/${examId}/questions/${question.id}/edit`}
                    onDelete={() => deleteQuestion(question.id)}
                    immutable={question.immutable}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </SectionCard>
  )
}
