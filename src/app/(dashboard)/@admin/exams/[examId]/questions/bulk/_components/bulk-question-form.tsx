"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm, useFieldArray, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { SectionCard } from "../../../../../_components/shared/section-card"
import { FormField } from "../../../../../_components/shared/form-field"
import { useCreateBulkAdminQuestions } from "@/features/admin/_hooks/questions/hooks"

const answerSchema = z.object({
  text: z.string().min(1, "Required"),
  isCorrect: z.boolean(),
})

const singleQuestionSchema = z.object({
  text: z.string().min(5, "Question must be at least 5 characters"),
  answers: z
    .array(answerSchema)
    .min(2, "At least 2 answers required")
    .refine((answers) => answers.some((a) => a.isCorrect), {
      message: "Mark one answer as correct",
    }),
})

const bulkSchema = z.object({
  questions: z.array(singleQuestionSchema).min(1, "Add at least one question"),
})

type BulkFormValues = z.infer<typeof bulkSchema>

interface BulkQuestionFormProps {
  examId: string
}

export function BulkQuestionForm({ examId }: BulkQuestionFormProps) {
  const router = useRouter()
  const { mutateAsync: createBulkQuestions, isPending } =
    useCreateBulkAdminQuestions()

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    unregister,
    control,
    formState: { errors, isSubmitting },
  } = useForm<BulkFormValues>({
    resolver: zodResolver(bulkSchema),
    defaultValues: {
      questions: [
        {
          text: "",
          answers: [
            { text: "", isCorrect: false },
            { text: "", isCorrect: false },
            { text: "", isCorrect: false },
            { text: "", isCorrect: false },
          ],
        },
      ],
    },
  })

  const { fields: questionFields, append: appendQuestion, remove: removeQuestion } =
    useFieldArray({ name: "questions", control })

  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0)

  function addQuestion() {
    appendQuestion({
      text: "",
      answers: [
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
      ],
    })
    setActiveQuestionIndex(questionFields.length)
  }

  function deleteQuestion(qIndex: number) {
    if (questionFields.length <= 1) return

    unregister(`questions.${qIndex}` as const)
    removeQuestion(qIndex)
    setActiveQuestionIndex((current) => {
      if (current > qIndex) return current - 1
      if (current === qIndex) return Math.max(0, current - 1)
      return Math.min(current, questionFields.length - 2)
    })
  }

  function setCorrect(qIndex: number, aIndex: number) {
    const answers = getValues(`questions.${qIndex}.answers`)
    answers.forEach((_, i) => {
      setValue(`questions.${qIndex}.answers.${i}.isCorrect`, i === aIndex)
    })
  }

  return (
    <form
      onSubmit={handleSubmit(async (values) => {
        await createBulkQuestions({ examId, fields: values })
        router.push(`/exams/${examId}/questions`)
      })}
      className="overflow-y-auto h-[calc(100vh-180px)]"
    >
      <div className="space-y-4">
        <SectionCard title="Questions">
          <div className="flex border-b border-gray-200 bg-white">
            {questionFields.map((qField, qIndex) => {
              const isActive = qIndex === activeQuestionIndex
              const hasError = !!errors.questions?.[qIndex]

              return (
                <div
                  key={qField.id}
                  className={[
                    "group flex h-10 min-w-20 items-center justify-center border-r border-gray-200 text-xs font-medium transition-colors",
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-blue-600",
                    hasError ? "text-red-600" : "",
                  ].join(" ")}
                >
                  <button
                    type="button"
                    onClick={() => setActiveQuestionIndex(qIndex)}
                    className="flex h-full flex-1 items-center justify-center px-4"
                  >
                    Q{qIndex + 1}
                  </button>
                  {questionFields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => deleteQuestion(qIndex)}
                      className="mr-2 rounded-sm p-0.5 text-gray-400 hover:bg-red-50 hover:text-red-500"
                      aria-label={`Delete question ${qIndex + 1}`}
                    >
                      <Trash2 className="size-3" />
                    </button>
                  )}
                </div>
              )
            })}
            <button
              type="button"
              onClick={addQuestion}
              className="ml-auto flex h-10 w-12 items-center justify-center text-gray-500 transition-colors hover:bg-gray-50 hover:text-blue-600"
              aria-label="Add another question"
            >
              <Plus className="size-4" />
            </button>
          </div>

          {questionFields.map((qField, qIndex) =>
            qIndex === activeQuestionIndex ? (
              <div key={qField.id} className="p-6 space-y-5">
                <FormField
                  label="Question Text"
                  htmlFor={`questions.${qIndex}.text`}
                  error={errors.questions?.[qIndex]?.text?.message}
                  required
                  className="max-w-2xl"
                >
                  <Textarea
                    id={`questions.${qIndex}.text`}
                    placeholder="Enter your question..."
                    rows={2}
                    {...register(`questions.${qIndex}.text`)}
                    aria-invalid={!!errors.questions?.[qIndex]?.text}
                    className="resize-none border-slate-300 focus-visible:border-blue-500 focus-visible:ring-0 rounded-none"
                  />
                </FormField>

                <BulkAnswers
                  qIndex={qIndex}
                  register={register}
                  setCorrect={setCorrect}
                  control={control}
                  errors={errors}
                />
              </div>
            ) : null
          )}
        </SectionCard>
      </div>

      <div className="flex items-center justify-between mt-4">
        <Button
          type="button"
          variant="outline"
          className="rounded-none border-dashed border-gray-300 gap-2 text-gray-600"
          onClick={addQuestion}
        >
          <Plus className="size-4" />
          Add Another Question
        </Button>

        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            className="rounded-none px-6"
            onClick={() => router.push(`/exams/${examId}/questions`)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="rounded-none px-6 bg-blue-600 hover:bg-blue-700"
            disabled={isSubmitting || isPending}
          >
            {isSubmitting || isPending ? "Saving..." : `Save ${questionFields.length} Question${questionFields.length > 1 ? "s" : ""}`}
          </Button>
        </div>
      </div>
    </form>
  )
}

function BulkAnswers({
  qIndex,
  register,
  setCorrect,
  control,
  errors,
}: {
  qIndex: number
  register: ReturnType<typeof useForm<BulkFormValues>>["register"]
  setCorrect: (qIndex: number, aIndex: number) => void
  control: ReturnType<typeof useForm<BulkFormValues>>["control"]
  errors: ReturnType<typeof useForm<BulkFormValues>>["formState"]["errors"]
}) {
  const answers =
    useWatch({
      control,
      name: `questions.${qIndex}.answers`,
    }) ?? []

  return (
    <div className="flex flex-col gap-2 max-w-2xl">
      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
        Answers <span className="text-red-500">*</span>
      </span>
      {errors.questions?.[qIndex]?.answers?.root && (
        <p className="text-xs text-red-500">
          {errors.questions[qIndex].answers?.root?.message}
        </p>
      )}
      <div className="space-y-2">
        {[0, 1, 2, 3].map((aIndex) => (
          <div key={aIndex} className="flex items-center gap-2">
            <input
              type="radio"
              name={`correctAnswer-${qIndex}`}
              checked={answers[aIndex]?.isCorrect ?? false}
              onChange={() => setCorrect(qIndex, aIndex)}
              className="accent-emerald-500 size-4 shrink-0"
            />
            <span className="text-xs text-gray-400 w-4">{aIndex + 1}.</span>
            <Input
              placeholder={`Answer ${aIndex + 1}`}
              {...register(`questions.${qIndex}.answers.${aIndex}.text`)}
              className={
                answers[aIndex]?.isCorrect
                  ? "border-emerald-300 bg-emerald-50 focus-visible:border-emerald-500"
                  : ""
              }
            />
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-400">
        Select the radio next to the correct answer.
      </p>
    </div>
  )
}
