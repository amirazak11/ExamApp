"use client"

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
import { FormActions } from "../../../../../_components/shared/form-actions"
import {
  useCreateAdminQuestion,
  useUpdateAdminQuestion,
} from "@/features/admin/_hooks/questions/hooks"

const answerSchema = z.object({
  text: z.string().min(1, "Answer text is required"),
  isCorrect: z.boolean(),
})

const questionSchema = z.object({
  text: z.string().min(5, "Question must be at least 5 characters"),
  answers: z
    .array(answerSchema)
    .min(2, "At least 2 answers required")
    .refine((answers) => answers.some((a) => a.isCorrect), {
      message: "At least one answer must be marked as correct",
    }),
})

type QuestionFormValues = z.infer<typeof questionSchema>

interface QuestionFormProps {
  examId: string
  questionId?: string
  defaultValues?: Partial<QuestionFormValues>
}

export function QuestionForm({
  examId,
  questionId,
  defaultValues,
}: QuestionFormProps) {
  const router = useRouter()
  const { mutateAsync: createQuestion, isPending } = useCreateAdminQuestion()
  const { mutateAsync: updateQuestion, isPending: isUpdating } =
    useUpdateAdminQuestion()

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<QuestionFormValues>({
    resolver: zodResolver(questionSchema),
    defaultValues: defaultValues ?? {
      text: "",
      answers: [
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
      ],
    },
  })

  const { fields, append, remove } = useFieldArray({ name: "answers", control })

  const answers = useWatch({ control, name: "answers" }) ?? []

  function setCorrect(index: number) {
    answers.forEach((_, i) => {
      setValue(`answers.${i}.isCorrect`, i === index)
    })
  }

  return (
    <form
      onSubmit={handleSubmit(async (values) => {
        if (questionId) {
          await updateQuestion({ id: questionId, fields: values })
        } else {
          await createQuestion({ ...values, examId })
        }

        router.push(`/exams/${examId}/questions`)
      })}
      className="overflow-y-auto h-[calc(100vh-180px)]"
    >
      <SectionCard title="Question Information">
        <div className="p-6 space-y-6">
          <FormField
            label="Question Text"
            htmlFor="text"
            error={errors.text?.message}
            required
            className="max-w-2xl"
          >
            <Textarea
              id="text"
              placeholder="Enter your question..."
              rows={3}
              {...register("text")}
              aria-invalid={!!errors.text}
              className="resize-none border-slate-300 focus-visible:border-blue-500 focus-visible:ring-0 rounded-none"
            />
          </FormField>

          <div className="flex flex-col gap-3 max-w-2xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Answers <span className="text-red-500">*</span>
              </span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="rounded-none border-gray-300 gap-1.5 text-xs h-7"
                onClick={() => append({ text: "", isCorrect: false })}
              >
                <Plus className="size-3" />
                Add Answer
              </Button>
            </div>

            {errors.answers?.root && (
              <p className="text-xs text-red-500">{errors.answers.root.message}</p>
            )}
            {typeof errors.answers?.message === "string" && (
              <p className="text-xs text-red-500">{errors.answers.message}</p>
            )}

            <div className="space-y-2">
              {fields.map((field, index) => (
                <div key={field.id} className="flex items-center gap-2">
                  <label className="flex items-center gap-2 cursor-pointer shrink-0">
                    <input
                      type="radio"
                      name="correctAnswer"
                      checked={answers[index]?.isCorrect ?? false}
                      onChange={() => setCorrect(index)}
                      className="accent-emerald-500 size-4"
                    />
                    <span className="text-xs text-gray-500 w-4">{index + 1}.</span>
                  </label>
                  <Input
                    placeholder={`Answer ${index + 1}`}
                    {...register(`answers.${index}.text`)}
                    aria-invalid={!!errors.answers?.[index]?.text}
                    className={
                      answers[index]?.isCorrect
                        ? "border-emerald-300 bg-emerald-50 focus-visible:border-emerald-500"
                        : ""
                    }
                  />
                  {fields.length > 2 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      className="shrink-0 text-gray-400 hover:text-red-500 hover:bg-red-50"
                      onClick={() => remove(index)}
                    >
                      <Trash2 className="size-3.5" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <p className="text-xs text-gray-400">
              Select the radio button next to the correct answer.
            </p>
          </div>
        </div>
      </SectionCard>

      <FormActions
        onCancel={() => router.push(`/exams/${examId}/questions`)}
        isSubmitting={isSubmitting || isPending || isUpdating}
        submitLabel={questionId ? "Save Changes" : "Save"}
      />
    </form>
  )
}
