"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { ExternalLink } from "lucide-react"
import type { IExam } from "@/lib/types/comment"
import { getImageUrl } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { uploadAdminImage } from "@/features/admin/apis/admin.fetch"
import { useAdminDiplomas } from "@/features/admin/_hooks/diplomas/hooks"
import {
  useCreateAdminExam,
  useUpdateAdminExam,
} from "@/features/admin/_hooks/exams/hooks"
import { AdminSelect } from "../../_components/shared/admin-select"
import { FormActions } from "../../_components/shared/form-actions"
import { FormField } from "../../_components/shared/form-field"
import { ImageUpload } from "../../_components/shared/image-upload"
import { PageHeader } from "../../_components/shared/page-header"
import { SectionCard } from "../../_components/shared/section-card"
import { ExamQuestionsSection } from "../[examId]/_components/exam-questions-section"

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
})

type ExamFormValues = z.infer<typeof examSchema>
type ExamFormInput = z.input<typeof examSchema>

interface ExamFormProps {
  exam?: IExam
}

export function ExamForm({ exam }: ExamFormProps) {
  const router = useRouter()
  const { data: diplomas } = useAdminDiplomas({ limit: 100 })
  const { mutateAsync: createExam } = useCreateAdminExam()
  const { mutateAsync: updateExam } = useUpdateAdminExam()
  const [imageFile, setImageFile] = useState<File | null>(null)
  const backHref = exam ? `/exams/${exam.id}` : "/exams"

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ExamFormInput, unknown, ExamFormValues>({
    resolver: zodResolver(examSchema),
    defaultValues: {
      title: exam?.title ?? "",
      description: exam?.description ?? "",
      diplomaId: exam?.diplomaId ?? "",
      duration: exam ? String(exam.duration) : "",
    },
  })

  return (
    <>
      <form
        onSubmit={handleSubmit(async (values) => {
          try {
            const image = imageFile ? await uploadAdminImage(imageFile) : undefined
            const fields = { ...values, image }

            if (exam) {
              await updateExam({ id: exam.id, fields })
            } else {
              await createExam(fields)
            }

            router.push(backHref)
          } catch {
            // The request layer already shows the error as a toast.
          }
        })}
      >
        <PageHeader
          breadcrumbs={
            exam
              ? [
                  { label: "Exams", href: "/exams" },
                  { label: exam.title, href: backHref },
                  { label: "Edit" },
                ]
              : [{ label: "Exams", href: "/exams" }, { label: "Create New Exam" }]
          }
          title={exam?.title}
          subtitle={
            exam?.diploma && (
              <Link
                href={`/${exam.diplomaId}`}
                className="inline-flex items-center gap-1 underline"
              >
                Diploma: {exam.diploma.title}
                <ExternalLink className="size-3" />
              </Link>
            )
          }
          actions={<FormActions cancelHref={backHref} isSubmitting={isSubmitting} />}
        />

        <div className="px-6 pt-6">
          <SectionCard title="Exam Information">
            <div className="grid gap-x-6 gap-y-5 p-4 md:grid-cols-2">
              <FormField label="Title" htmlFor="title" error={errors.title?.message}>
                <Input id="title" {...register("title")} aria-invalid={!!errors.title} />
              </FormField>

              <FormField
                label="Diploma"
                htmlFor="diplomaId"
                error={errors.diplomaId?.message}
              >
                {/* Controlled so the value still applies once the options finish loading. */}
                <Controller
                  name="diplomaId"
                  control={control}
                  render={({ field }) => (
                    <AdminSelect
                      id="diplomaId"
                      placeholder="Select diploma"
                      options={(diplomas?.data ?? []).map((diploma) => ({
                        value: diploma.id,
                        label: diploma.title,
                      }))}
                      {...field}
                    />
                  )}
                />
              </FormField>

              <FormField label="Image">
                <ImageUpload
                  initialPreview={getImageUrl(exam?.image)}
                  onFileChange={setImageFile}
                />
              </FormField>

              <FormField
                label="Description"
                htmlFor="description"
                error={errors.description?.message}
                className="md:row-span-2"
              >
                <Textarea
                  id="description"
                  {...register("description")}
                  aria-invalid={!!errors.description}
                  className="h-full min-h-32 resize-none border-slate-300 focus-visible:border-blue-500 focus-visible:ring-0 rounded-none"
                />
              </FormField>

              <FormField
                label="Duration (min)"
                htmlFor="duration"
                error={errors.duration?.message}
              >
                <Input
                  id="duration"
                  type="number"
                  min={1}
                  {...register("duration")}
                  aria-invalid={!!errors.duration}
                />
              </FormField>
            </div>
          </SectionCard>
        </div>
      </form>

      {exam && (
        <div className="px-6 pt-4">
          <ExamQuestionsSection examId={exam.id} />
        </div>
      )}
      <div className="h-6" />
    </>
  )
}
