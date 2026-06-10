"use client"

import Link from "next/link"
import { CheckCircle2, Plus } from "lucide-react"
import type { IQuestion } from "@/features/questions/types/questions"
import {
  AdminDataTable,
  type AdminTableColumn,
} from "../../../_components/shared/admin-data-table"
import { ActionButtons } from "../../../_components/shared/action-buttons"
import { SectionCard } from "../../../_components/shared/section-card"
import { Button } from "@/components/ui/button"
import {
  useAdminQuestionsByExam,
  useDeleteAdminQuestion,
} from "@/features/admin/_hooks/questions/hooks"

type ExamQuestionsSectionProps = {
  examId: string
}

export function ExamQuestionsSection({ examId }: ExamQuestionsSectionProps) {
  const { data: questions = [], isLoading, isError } =
    useAdminQuestionsByExam(examId)
  const { mutateAsync: deleteQuestion } = useDeleteAdminQuestion()

  const columns: AdminTableColumn<IQuestion>[] = [
    {
      key: "text",
      header: "Title",
      className: "font-medium text-gray-800",
      cell: (question) => <p className="line-clamp-2">{question.text}</p>,
    },
    {
      key: "answers",
      header: "Answers",
      headClassName: "w-28",
      cell: (question) => (
        <div className="flex items-center gap-1.5 text-sm text-gray-600">
          <CheckCircle2 className="size-3.5 text-emerald-500" />
          {question.answers.length}
        </div>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      headClassName: "w-28 text-right",
      cell: (question) => (
        <ActionButtons
          viewHref={`/exams/${examId}/questions/${question.id}`}
          editHref={`/exams/${examId}/questions/${question.id}/edit`}
          onDelete={async () => {
            await deleteQuestion(question.id)
          }}
          disabledDelete={question.immutable}
          disabledDeleteTooltip="Only super admin can delete immutable questions"
        />
      ),
    },
  ]

  if (isLoading) return <p>Loading questions...</p>
  if (isError) return <p>Something went wrong loading questions.</p>

  return (
    <SectionCard
      title="Exam Questions"
      actions={
        <Button
          size="sm"
          className="h-7 rounded-none gap-1.5 bg-emerald-500 px-3 text-xs hover:bg-emerald-600"
          asChild
        >
          <Link href={`/exams/${examId}/questions/new`}>
            <Plus className="size-3.5" />
            Add Questions
          </Link>
        </Button>
      }
    >
      <div className="p-4">
        <AdminDataTable
          data={questions}
          columns={columns}
          getRowKey={(question) => question.id}
          searchPlaceholder="Search questions..."
          searchPredicate={(question, query) =>
            question.text.toLowerCase().includes(query)
          }
          emptyMessage="No questions found."
          page={1}
          totalPages={1}
          total={questions.length}
          limit={Math.max(questions.length, 1)}
        />
      </div>
    </SectionCard>
  )
}
