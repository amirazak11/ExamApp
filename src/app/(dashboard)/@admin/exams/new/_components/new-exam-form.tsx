"use client"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { SectionCard } from "../../../_components/shared/section-card"
import { FormField } from "../../../_components/shared/form-field"
import { FormActions } from "../../../_components/shared/form-actions"
import { ImageUpload } from "../../../_components/shared/image-upload"
import { useCreateAdminExam } from "@/features/admin/_hooks/exams/hooks"

const examSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),

  description: z.string().min(10, "Description must be at least 10 characters"),

  diplomaId: z.string().min(1, "Diploma is required"),

  duration: z
    .string()
    .min(1, "Duration is required")
    .refine((value) => !isNaN(Number(value)), {
      message: "Must be a number",
    })
    .transform((value) => Number(value))
    .refine((value) => value >= 1, {
      message: "Duration must be at least 1 minute",
    }),
});
type ExamFormValues = z.infer<typeof examSchema>
type ExamFormInput = z.input<typeof examSchema>

export function NewExamForm() {
  const router = useRouter()
  const { mutateAsync: createExam, isPending } = useCreateAdminExam()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ExamFormInput, unknown, ExamFormValues>({
    resolver: zodResolver(examSchema),
  })

  return (
    <form
      onSubmit={handleSubmit(async (values) => {
        await createExam(values)
        router.push("/exams")
      })}
      className="overflow-y-auto h-[calc(100vh-180px)]"
    >
      <SectionCard title="Exam Information">
        <div className="p-6 space-y-6">
          <FormField label="Cover Image">
            <ImageUpload />
          </FormField>

          <FormField
            label="Title"
            htmlFor="title"
            error={errors.title?.message}
            required
            className="max-w-md"
          >
            <Input
              id="title"
              placeholder="Enter exam title"
              {...register("title")}
              aria-invalid={!!errors.title}
            />
          </FormField>

          <FormField
            label="Description"
            htmlFor="description"
            error={errors.description?.message}
            required
            className="max-w-2xl"
          >
            <Textarea
              id="description"
              placeholder="Enter exam description"
              rows={4}
              {...register("description")}
              aria-invalid={!!errors.description}
              className="resize-none border-slate-300 focus-visible:border-blue-500 focus-visible:ring-0 rounded-none"
            />
          </FormField>

          <FormField
            label="Diploma ID"
            htmlFor="diplomaId"
            error={errors.diplomaId?.message}
            required
            className="max-w-md"
          >
            <Input
              id="diplomaId"
              placeholder="Enter diploma ID"
              {...register("diplomaId")}
              aria-invalid={!!errors.diplomaId}
            />
          </FormField>

          <FormField
            label="Duration (minutes)"
            htmlFor="duration"
            error={errors.duration?.message}
            required
            className="max-w-xs"
          >
            <Input
              id="duration"
              type="number"
              min={1}
              placeholder="e.g. 60"
              {...register("duration")}
              aria-invalid={!!errors.duration}
            />
          </FormField>
        </div>
      </SectionCard>

      <FormActions
        onCancel={() => router.push("/exams")}
        isSubmitting={isSubmitting || isPending}
      />
    </form>
  )
}
