"use client"

import { useAdminExam } from "@/features/admin/_hooks/exams/hooks"
import { ExamForm } from "../../../_components/exam-form"

type EditExamPageClientProps = {
  examId: string
}

export function EditExamPageClient({ examId }: EditExamPageClientProps) {
  const { data: exam, isLoading, isError } = useAdminExam(examId)

  if (isLoading) return <div className="p-6">Loading...</div>

  if (isError || !exam) {
    return (
      <div className="p-6">
        <p className="text-gray-500 text-sm">Exam not found.</p>
      </div>
    )
  }

  return <ExamForm exam={exam} />
}
