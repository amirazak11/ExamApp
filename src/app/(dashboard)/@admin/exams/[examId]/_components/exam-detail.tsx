"use client"

import Image from "next/image"
import Link from "next/link"
import { ClipboardList, Clock, HelpCircle, Lock, Pencil, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { AppBreadcrumb } from "@/app/(dashboard)/@user/(diplomas)/_components/shared/breadcremb"
import { Header } from "@/app/(dashboard)/@user/(diplomas)/_components/shared/header"
import { Button } from "@/components/ui/button"
import {
  useAdminExam,
  useDeleteAdminExam,
  useSetAdminExamImmutable,
} from "@/features/admin/_hooks/exams/hooks"
import { ConfirmDialog } from "../../../_components/shared/confirm-dialog"
import { SectionCard } from "../../../_components/shared/section-card"
import { ExamQuestionsSection } from "./exam-questions-section"

type ExamDetailProps = {
  examId: string
}

export function ExamDetail({ examId }: ExamDetailProps) {
  const router = useRouter()
  const { data: exam, isLoading, isError } = useAdminExam(examId)
  const { mutateAsync: deleteExam } = useDeleteAdminExam()
  const { mutateAsync: setImmutable, isPending: isSettingImmutable } =
    useSetAdminExamImmutable()

  if (isLoading) return <div className="p-6">Loading...</div>

  if (isError || !exam) {
    return (
      <>
        <AppBreadcrumb
          items={[{ label: "Exams", href: "/exams" }, { label: "Not found" }]}
        />
        <div className="p-6">
          <p className="text-gray-500 text-sm">Exam not found.</p>
        </div>
      </>
    )
  }

  return (
    <>
      <AppBreadcrumb
        items={[{ label: "Exams", href: "/exams" }, { label: exam.title }]}
      />
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <Header
            title={exam.title}
            icon={ClipboardList}
            className="flex-1"
            backbutton
          />
          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="outline"
              className="rounded-none border-gray-300 gap-2 text-gray-700 hover:border-amber-400 hover:text-amber-600"
              asChild
            >
              <Link href={`/exams/${examId}/edit`}>
                <Pencil className="size-4" />
                Edit
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="rounded-none gap-2 border border-gray-300 text-gray-500 hover:border-blue-400 hover:text-blue-600"
              disabled={exam.immutable || isSettingImmutable}
              onClick={() => setImmutable({ id: examId, immutable: true })}
            >
              <Lock className="size-4" />
              {exam.immutable ? "Immutable" : "Make Immutable"}
            </Button>
            <ConfirmDialog
              title="Delete Exam"
              description={`Are you sure you want to delete "${exam.title}"? This action cannot be undone.`}
              onConfirm={async () => {
                await deleteExam(examId)
                router.push("/exams")
              }}
              disabled={exam.immutable}
              trigger={
                <Button
                  variant="destructive"
                  className="rounded-none gap-2"
                  disabled={exam.immutable}
                >
                  <Trash2 className="size-4" />
                  Delete
                </Button>
              }
            />
          </div>
        </div>

        <SectionCard title="Exam Information">
          <div className="p-6 space-y-6">
            {exam.image && (
              <div className="flex flex-col gap-2">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Cover Image
                </span>
                <div className="w-48 h-48 border border-gray-200 bg-gray-50 overflow-hidden flex items-center justify-center">
                  <Image
                    src={`https://exam-app.elevate-bootcamp.cloud${exam.image}`}
                    alt={exam.title}
                    width={192}
                    height={192}
                    unoptimized
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            )}
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Title
              </span>
              <p className="text-gray-800 font-medium">{exam.title}</p>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Description
              </span>
              <p className="text-gray-600 text-sm leading-relaxed">
                {exam.description}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6 max-w-sm">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Duration
                </span>
                <div className="flex items-center gap-1.5 text-gray-700">
                  <Clock className="size-4 text-gray-400" />
                  <span className="font-medium">{exam.duration} min</span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Questions
                </span>
                <div className="flex items-center gap-1.5 text-gray-700">
                  <HelpCircle className="size-4 text-gray-400" />
                  <span className="font-medium">{exam.questionsCount ?? 0}</span>
                </div>
              </div>
            </div>
          </div>
        </SectionCard>

        <ExamQuestionsSection examId={examId} />
      </div>
    </>
  )
}
