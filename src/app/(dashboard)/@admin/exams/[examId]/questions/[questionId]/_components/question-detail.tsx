"use client"

import Link from "next/link"
import { CheckCircle2, HelpCircle, Pencil, Trash2, XCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { AppBreadcrumb } from "@/app/(dashboard)/@user/(diplomas)/_components/shared/breadcremb"
import { Header } from "@/app/(dashboard)/@user/(diplomas)/_components/shared/header"
import { Button } from "@/components/ui/button"
import {
  useAdminQuestion,
  useDeleteAdminQuestion,
} from "@/features/admin/_hooks/questions/hooks"
import { ConfirmDialog } from "../../../../../_components/shared/confirm-dialog"
import { SectionCard } from "../../../../../_components/shared/section-card"

type QuestionDetailProps = {
  examId: string
  questionId: string
}

export function QuestionDetail({ examId, questionId }: QuestionDetailProps) {
  const router = useRouter()
  const { data: question, isLoading, isError } = useAdminQuestion(questionId)
  const { mutateAsync: deleteQuestion } = useDeleteAdminQuestion()

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
          { label: "View" },
        ]}
      />
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <Header title="Question" icon={HelpCircle} className="flex-1" backbutton />
          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="outline"
              className="rounded-none border-gray-300 gap-2 text-gray-700 hover:border-amber-400 hover:text-amber-600"
              asChild
            >
              <Link href={`/exams/${examId}/questions/${questionId}/edit`}>
                <Pencil className="size-4" />
                Edit
              </Link>
            </Button>

            <ConfirmDialog
              title="Delete Question"
              description="Are you sure you want to delete this question? This action cannot be undone."
              onConfirm={async () => {
                await deleteQuestion(questionId)
                router.push(`/exams/${examId}/questions`)
              }}
              disabled={question.immutable}
              trigger={
                <Button
                  variant="destructive"
                  className="rounded-none gap-2"
                  disabled={question.immutable}
                >
                  <Trash2 className="size-4" />
                  Delete
                </Button>
              }
            />
          </div>
        </div>

        <SectionCard title="Question Details">
          <div className="p-6 space-y-6">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Question Text
              </span>
              <p className="text-gray-800 font-medium leading-relaxed">
                {question.text}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Answers
              </span>
              <div className="space-y-2">
                {question.answers.map((answer) => (
                  <div
                    key={answer.id}
                    className={`flex items-center gap-3 px-4 py-3 border ${
                      answer.isCorrect
                        ? "border-emerald-200 bg-emerald-50"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    {answer.isCorrect ? (
                      <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                    ) : (
                      <XCircle className="size-4 text-gray-300 shrink-0" />
                    )}
                    <span
                      className={`text-sm ${
                        answer.isCorrect
                          ? "text-emerald-700 font-medium"
                          : "text-gray-600"
                      }`}
                    >
                      {answer.text}
                    </span>
                    {answer.isCorrect && (
                      <span className="ml-auto text-xs text-emerald-600 font-medium">
                        Correct
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SectionCard>
      </div>
    </>
  )
}
