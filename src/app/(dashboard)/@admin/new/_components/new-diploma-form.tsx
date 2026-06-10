"use client"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { SectionCard } from "../../_components/shared/section-card"
import { FormField } from "../../_components/shared/form-field"
import { ImageUpload } from "../../_components/shared/image-upload"
import { FormActions } from "../../_components/shared/form-actions"
import { useCreateAdminDiploma } from "@/features/admin/_hooks/diplomas/hooks"

const diplomaSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
})

type DiplomaFormValues = z.infer<typeof diplomaSchema>

export function NewDiplomaForm() {
  const router = useRouter()
  const { mutateAsync: createDiploma, isPending } = useCreateAdminDiploma()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DiplomaFormValues>({
    resolver: zodResolver(diplomaSchema),
  })

  return (
    <form
      onSubmit={handleSubmit(async (values) => {
        await createDiploma(values)
        router.push("/")
      })}
      className="overflow-y-auto h-[calc(100vh-180px)]"
    >
      <SectionCard title="Diploma Information">
        <div className="p-6 space-y-6">
          <FormField label="Image">
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
              placeholder="Enter diploma title"
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
              placeholder="Enter diploma description"
              rows={5}
              {...register("description")}
              aria-invalid={!!errors.description}
              className="resize-none border-slate-300 focus-visible:border-blue-500 focus-visible:ring-0 rounded-none"
            />
          </FormField>
        </div>
      </SectionCard>

      <FormActions
        onCancel={() => router.push("/")}
        isSubmitting={isSubmitting || isPending}
      />
    </form>
  )
}
