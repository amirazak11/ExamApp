"use client"

import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { useRouter } from "next/navigation"
import {
  useAdminQuestion,
  useDeleteAdminQuestion,
  useSetAdminQuestionImmutable,
} from "@/features/admin/_hooks/questions/hooks"
import { DetailActions } from "../../../../../_components/shared/detail-actions"
import { DetailField } from "../../../../../_components/shared/detail-field"
import { PageHeader } from "../../../../../_components/shared/page-header"

type QuestionDetailProps = {
  examId: string
  questionId: string
}

export function QuestionDetail({ examId, questionId }: QuestionDetailProps) {
  const router = useRouter()
  const { data: question, isLoading, isError } = useAdminQuestion(questionId)
  const { mutate: deleteQuestion } = useDeleteAdminQuestion()
  const { mutate: setImmutable, isPending: isSettingImmutable } =
    useSetAdminQuestionImmutable()

  if (isLoading) return <div className="p-6">Loading...</div>

  if (isError || !question) {
    return (
      <div className="p-6">
        <p className="text-gray-500 text-sm">Question not found.</p>
      </div>
    )
  }

  const examTitle = question.exam?.title ?? "Exam"
  const examLink = (
    <Link
      href={`/exams/${examId}`}
      className="inline-flex items-center gap-1 underline"
    >
      {examTitle}
      <ExternalLink className="size-3" />
    </Link>
  )

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Exams", href: "/exams" },
          { label: examTitle, href: `/exams/${examId}` },
          { label: "Questions", href: `/exams/${examId}` },
          { label: question.text },
        ]}
        title={question.text}
        subtitle={<>Exam: {examLink}</>}
        actions={
          <DetailActions
            immutable={question.immutable}
            isSettingImmutable={isSettingImmutable}
            onSetImmutable={(immutable) =>
              setImmutable({ id: questionId, immutable })
            }
            editHref={`/exams/${examId}/questions/${questionId}/edit`}
            deleteTitle="Are you sure you want to delete this question?"
            onDelete={() =>
              deleteQuestion(questionId, {
                onSuccess: () => router.push(`/exams/${examId}`),
              })
            }
          />
        }
      />

      <div className="p-6">
        <div className="space-y-4 bg-white p-4">
          <DetailField label="Headline">{question.text}</DetailField>
          <DetailField label="Exam">{examLink}</DetailField>
          <DetailField label="Answers">{question.answers.length}</DetailField>
        </div>
      </div>
    </>
  )
}
