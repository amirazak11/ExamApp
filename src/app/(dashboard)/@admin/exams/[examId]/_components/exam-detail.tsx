"use client"

import Image from "next/image"
import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { useRouter } from "next/navigation"
import { getImageUrl } from "@/lib/utils"
import {
  useAdminExam,
  useDeleteAdminExam,
  useSetAdminExamImmutable,
} from "@/features/admin/_hooks/exams/hooks"
import { DetailActions } from "../../../_components/shared/detail-actions"
import { DetailField } from "../../../_components/shared/detail-field"
import { PageHeader } from "../../../_components/shared/page-header"
import { ExamQuestionsSection } from "./exam-questions-section"

type ExamDetailProps = {
  examId: string
}

export function ExamDetail({ examId }: ExamDetailProps) {
  const router = useRouter()
  const { data: exam, isLoading, isError } = useAdminExam(examId)
  const { mutate: deleteExam } = useDeleteAdminExam()
  const { mutate: setImmutable, isPending: isSettingImmutable } =
    useSetAdminExamImmutable()

  if (isLoading) return <div className="p-6">Loading...</div>

  if (isError || !exam) {
    return (
      <>
        <PageHeader
          breadcrumbs={[{ label: "Exams", href: "/exams" }, { label: "Not found" }]}
        />
        <div className="p-6">
          <p className="text-gray-500 text-sm">Exam not found.</p>
        </div>
      </>
    )
  }

  const imageUrl = getImageUrl(exam.image)

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "Exams", href: "/exams" }, { label: exam.title }]}
        title={exam.title}
        subtitle={
          exam.diploma && (
            <Link
              href={`/${exam.diplomaId}`}
              className="inline-flex items-center gap-1 underline"
            >
              Diploma: {exam.diploma.title}
              <ExternalLink className="size-3" />
            </Link>
          )
        }
        actions={
          <DetailActions
            immutable={exam.immutable}
            isSettingImmutable={isSettingImmutable}
            onSetImmutable={(immutable) => setImmutable({ id: examId, immutable })}
            editHref={`/exams/${examId}/edit`}
            deleteTitle={`Are you sure you want to delete "${exam.title}"?`}
            onDelete={() =>
              deleteExam(examId, { onSuccess: () => router.push("/exams") })
            }
          />
        }
      />

      <div className="space-y-4 p-6">
        <div className="space-y-4 bg-white p-4">
          {imageUrl && (
            <DetailField label="Image">
              <Image
                src={imageUrl}
                alt={exam.title}
                width={240}
                height={240}
                unoptimized
                className="size-60 object-cover"
              />
            </DetailField>
          )}
          <DetailField label="Title">{exam.title}</DetailField>
          <DetailField label="Description">
            <p className="leading-relaxed">{exam.description}</p>
          </DetailField>
          <DetailField label="Diploma">{exam.diploma?.title ?? "-"}</DetailField>
          <DetailField label="Duration">{exam.duration} Minutes</DetailField>
          <DetailField label="No. of Questions">{exam.questionsCount ?? 0}</DetailField>
        </div>

        <ExamQuestionsSection examId={examId} />
      </div>
    </>
  )
}
