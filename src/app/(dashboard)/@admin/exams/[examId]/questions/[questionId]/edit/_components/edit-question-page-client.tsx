"use client"

import { useAdminQuestion } from "@/features/admin/_hooks/questions/hooks"
import { QuestionForm } from "../../../new/_components/question-form"

type EditQuestionPageClientProps = {
  examId: string
  questionId: string
}

export function EditQuestionPageClient({
  examId,
  questionId,
}: EditQuestionPageClientProps) {
  const { data: question, isLoading, isError } = useAdminQuestion(questionId)

  if (isLoading) return <div className="p-6">Loading...</div>

  if (isError || !question) {
    return (
      <div className="p-6">
        <p className="text-gray-500 text-sm">Question not found.</p>
      </div>
    )
  }

  return (
    <QuestionForm
      examId={examId}
      questionId={questionId}
      defaultValues={{
        text: question.text,
        answers: question.answers.map((answer) => ({
          text: answer.text,
          isCorrect: answer.isCorrect,
        })),
      }}
    />
  )
}
