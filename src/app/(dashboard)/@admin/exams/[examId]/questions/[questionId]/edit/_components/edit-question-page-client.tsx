"use client"

import { HelpCircle } from "lucide-react"
import { AppBreadcrumb } from "@/app/(dashboard)/@user/(diplomas)/_components/shared/breadcremb"
import { Header } from "@/app/(dashboard)/@user/(diplomas)/_components/shared/header"
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
    <>
      <AppBreadcrumb
        items={[
          { label: "Exams", href: "/exams" },
          { label: "Questions", href: `/exams/${examId}/questions` },
          { label: "Edit Question" },
        ]}
      />
      <div className="p-6 space-y-4">
        <Header title="Edit Question" icon={HelpCircle} backbutton />
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
      </div>
    </>
  )
}
