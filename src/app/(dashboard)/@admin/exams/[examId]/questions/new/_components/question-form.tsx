"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Layers } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAdminExams } from "@/features/admin/_hooks/exams/hooks"
import {
  useCreateAdminQuestion,
  useUpdateAdminQuestion,
} from "@/features/admin/_hooks/questions/hooks"
import { AdminSelect } from "../../../../../_components/shared/admin-select"
import { AnswersEditor } from "../../../../../_components/shared/answers-editor"
import { FormActions } from "../../../../../_components/shared/form-actions"
import { FormField } from "../../../../../_components/shared/form-field"
import { PageHeader } from "../../../../../_components/shared/page-header"
import { SectionCard } from "../../../../../_components/shared/section-card"

const questionSchema = z.object({
  examId: z.string().min(1, "Exam is required"),
  text: z.string().min(5, "Question must be at least 5 characters"),
  answers: z
    .array(z.object({ text: z.string().min(1), isCorrect: z.boolean() }))
    .min(2, "At least 2 answers required")
    .refine((answers) => answers.filter((a) => a.isCorrect).length === 1, {
      message: "Mark exactly one answer as correct",
    }),
})

type QuestionFormValues = z.infer<typeof questionSchema>

interface QuestionFormProps {
  examId: string
  questionId?: string
  defaultValues?: Pick<QuestionFormValues, "text" | "answers">
}

export function QuestionForm({
  examId,
  questionId,
  defaultValues,
}: QuestionFormProps) {
  const router = useRouter()
  const { data: exams } = useAdminExams({ limit: 100 })
  const { mutateAsync: createQuestion } = useCreateAdminQuestion()
  const { mutateAsync: updateQuestion } = useUpdateAdminQuestion()
  const examTitle = exams?.exams.find((exam) => exam.id === examId)?.title ?? "Exam"

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<QuestionFormValues>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      examId,
      text: defaultValues?.text ?? "",
      answers: defaultValues?.answers ?? [],
    },
  })

  return (
    <form
      onSubmit={handleSubmit(async ({ examId: selectedExamId, ...fields }) => {
        try {
          if (questionId) {
            await updateQuestion({ id: questionId, fields })
          } else {
            await createQuestion({ ...fields, examId: selectedExamId })
          }

          router.push(`/exams/${selectedExamId}`)
        } catch {
          // The request layer already shows the error as a toast.
        }
      })}
    >
      <PageHeader
        breadcrumbs={[
          { label: "Exams", href: "/exams" },
          { label: examTitle, href: `/exams/${examId}` },
          { label: questionId ? "Edit Question" : "Add Questions" },
        ]}
        leading={
          !questionId && (
            <Button
              variant="outline"
              className="rounded-none gap-2 border-gray-300 text-gray-700"
              asChild
            >
              <Link href={`/exams/${examId}/questions/bulk`}>
                <Layers className="size-4" />
                Bulk Add Mode
              </Link>
            </Button>
          )
        }
        actions={
          <FormActions cancelHref={`/exams/${examId}`} isSubmitting={isSubmitting} />
        }
      />

      <div className="space-y-4 p-6">
        <SectionCard title="Question Information">
          <div className="space-y-5 p-4">
            <FormField label="Exam" htmlFor="examId" error={errors.examId?.message}>
              {/* Controlled so the value still applies once the options finish loading. */}
              <Controller
                name="examId"
                control={control}
                render={({ field }) => (
                  <AdminSelect
                    id="examId"
                    placeholder="Select exam"
                    disabled={!!questionId}
                    options={(exams?.exams ?? []).map((exam) => ({
                      value: exam.id,
                      label: exam.title,
                    }))}
                    {...field}
                  />
                )}
              />
            </FormField>

            <FormField
              label="Question Headline"
              htmlFor="text"
              error={errors.text?.message}
            >
              <Input id="text" {...register("text")} aria-invalid={!!errors.text} />
            </FormField>
          </div>
        </SectionCard>

        <SectionCard title="Question Answers">
          <Controller
            name="answers"
            control={control}
            render={({ field }) => (
              <AnswersEditor
                value={field.value}
                onChange={field.onChange}
                error={errors.answers?.message ?? errors.answers?.root?.message}
              />
            )}
          />
        </SectionCard>
      </div>
    </form>
  )
}
