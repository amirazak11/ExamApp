"use client"

import { useAdminQuestionsByExam } from "@/features/admin/_hooks/questions/hooks"
import { QuestionsTable } from "./questions-table"

type QuestionsListProps = {
  examId: string
}

export function QuestionsList({ examId }: QuestionsListProps) {
  const { data: questions = [], isLoading, isError } =
    useAdminQuestionsByExam(examId)

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Something went wrong</p>

  return (
    <QuestionsTable
      questions={questions}
      examId={examId}
      total={questions.length}
      page={1}
      limit={10}
    />
  )
}
