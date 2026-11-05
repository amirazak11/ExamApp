"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Layers, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useAdminExams } from "@/features/admin/_hooks/exams/hooks"
import { useCreateBulkAdminQuestions } from "@/features/admin/_hooks/questions/hooks"
import { AdminSelect } from "../../../../../_components/shared/admin-select"
import { AnswersEditor } from "../../../../../_components/shared/answers-editor"
import { FormActions } from "../../../../../_components/shared/form-actions"
import { FormField } from "../../../../../_components/shared/form-field"
import { PageHeader } from "../../../../../_components/shared/page-header"
import { SectionCard } from "../../../../../_components/shared/section-card"

const singleQuestionSchema = z.object({
  text: z.string().min(5, "Question must be at least 5 characters"),
  answers: z
    .array(z.object({ text: z.string().min(1), isCorrect: z.boolean() }))
    .min(2, "At least 2 answers required")
    .refine((answers) => answers.filter((a) => a.isCorrect).length === 1, {
      message: "Mark exactly one answer as correct",
    }),
})

const bulkSchema = z.object({
  examId: z.string().min(1, "Exam is required"),
  questions: z.array(singleQuestionSchema).min(1, "Add at least one question"),
})

type BulkFormValues = z.infer<typeof bulkSchema>

const EMPTY_QUESTION = { text: "", answers: [] }

interface BulkQuestionFormProps {
  examId: string
}

export function BulkQuestionForm({ examId }: BulkQuestionFormProps) {
  const router = useRouter()
  const { data: exams } = useAdminExams({ limit: 100 })
  const { mutateAsync: createBulkQuestions } = useCreateBulkAdminQuestions()
  const examTitle = exams?.exams.find((exam) => exam.id === examId)?.title ?? "Exam"

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<BulkFormValues>({
    resolver: zodResolver(bulkSchema),
    defaultValues: { examId, questions: [EMPTY_QUESTION] },
  })

  const { fields, append, remove } = useFieldArray({ name: "questions", control })
  const [activeIndex, setActiveIndex] = useState(0)
  const activeField = fields[activeIndex]
  const activeErrors = errors.questions?.[activeIndex]

  function deleteQuestion(index: number) {
    remove(index)
    setActiveIndex((current) =>
      current > index || current === fields.length - 1 ? current - 1 : current
    )
  }

  return (
    <form
      onSubmit={handleSubmit(async ({ examId: selectedExamId, questions }) => {
        try {
          await createBulkQuestions({ examId: selectedExamId, fields: { questions } })
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
          { label: "Bulk Add Questions" },
        ]}
        leading={
          <Button
            className="rounded-none gap-2 bg-blue-600 text-white hover:bg-blue-700"
            asChild
          >
            <Link href={`/exams/${examId}/questions/new`}>
              <Layers className="size-4" />
              Bulk Add Mode
            </Link>
          </Button>
        }
        actions={
          <FormActions cancelHref={`/exams/${examId}`} isSubmitting={isSubmitting} />
        }
      />

      <div className="space-y-4 p-6">
        <SectionCard title="Exam Info">
          <div className="p-4">
            <FormField label="Exam" htmlFor="examId" error={errors.examId?.message}>
              {/* Controlled so the value still applies once the options finish loading. */}
              <Controller
                name="examId"
                control={control}
                render={({ field }) => (
                  <AdminSelect
                    id="examId"
                    placeholder="Select exam"
                    options={(exams?.exams ?? []).map((exam) => ({
                      value: exam.id,
                      label: exam.title,
                    }))}
                    {...field}
                  />
                )}
              />
            </FormField>
          </div>
        </SectionCard>

        <SectionCard title="Questions">
          <div className="flex overflow-x-auto border-b border-gray-200">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className={cn(
                  "flex h-10 min-w-16 flex-1 items-center justify-center border-r border-gray-200 text-xs font-medium",
                  index === activeIndex
                    ? "border-b-2 border-b-blue-600 bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50",
                  errors.questions?.[index] && "text-red-600"
                )}
              >
                <button
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className="h-full flex-1 px-3"
                >
                  Q{index + 1}
                </button>
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => deleteQuestion(index)}
                    className="mr-1 p-0.5 text-gray-400 hover:text-red-500"
                    aria-label={`Delete question ${index + 1}`}
                  >
                    <X className="size-3" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                append(EMPTY_QUESTION)
                setActiveIndex(fields.length)
              }}
              className="flex h-10 w-12 shrink-0 items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-blue-600"
              aria-label="Add another question"
            >
              <Plus className="size-4" />
            </button>
          </div>

          {activeField && (
            <div key={activeField.id}>
              <div className="p-4">
                <FormField
                  label="Question Headline"
                  htmlFor={`questions.${activeIndex}.text`}
                  error={activeErrors?.text?.message}
                >
                  <Input
                    id={`questions.${activeIndex}.text`}
                    {...register(`questions.${activeIndex}.text`)}
                    aria-invalid={!!activeErrors?.text}
                  />
                </FormField>
              </div>

              <Controller
                name={`questions.${activeIndex}.answers`}
                control={control}
                render={({ field }) => (
                  <AnswersEditor
                    value={field.value}
                    onChange={field.onChange}
                    error={
                      activeErrors?.answers?.message ??
                      activeErrors?.answers?.root?.message
                    }
                  />
                )}
              />
            </div>
          )}
        </SectionCard>
      </div>
    </form>
  )
}
