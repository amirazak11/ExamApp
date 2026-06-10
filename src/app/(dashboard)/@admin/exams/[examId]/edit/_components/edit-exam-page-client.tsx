"use client"

import { ClipboardList } from "lucide-react"
import { AppBreadcrumb } from "@/app/(dashboard)/@user/(diplomas)/_components/shared/breadcremb"
import { Header } from "@/app/(dashboard)/@user/(diplomas)/_components/shared/header"
import { useAdminExam } from "@/features/admin/_hooks/exams/hooks"
import { EditExamForm } from "./edit-exam-form"

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

  return (
    <>
      <AppBreadcrumb
        items={[
          { label: "Exams", href: "/exams" },
          { label: exam.title, href: `/exams/${examId}` },
          { label: "Edit" },
        ]}
      />
      <div className="p-6 space-y-4">
        <Header title={`Edit: ${exam.title}`} icon={ClipboardList} backbutton />
        <EditExamForm exam={exam} />
      </div>
    </>
  )
}
