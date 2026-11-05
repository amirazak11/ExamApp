"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import type { IDiploma } from "@/lib/types/IDiploma"
import { getImageUrl } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { uploadAdminImage } from "@/features/admin/apis/admin.fetch"
import {
  useCreateAdminDiploma,
  useUpdateAdminDiploma,
} from "@/features/admin/_hooks/diplomas/hooks"
import { FormActions } from "./shared/form-actions"
import { FormField } from "./shared/form-field"
import { ImageUpload } from "./shared/image-upload"
import { PageHeader } from "./shared/page-header"
import { SectionCard } from "./shared/section-card"

const diplomaSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
})

type DiplomaFormValues = z.infer<typeof diplomaSchema>

interface DiplomaFormProps {
  diploma?: IDiploma
}

export function DiplomaForm({ diploma }: DiplomaFormProps) {
  const router = useRouter()
  const { mutateAsync: createDiploma } = useCreateAdminDiploma()
  const { mutateAsync: updateDiploma } = useUpdateAdminDiploma()
  const [imageFile, setImageFile] = useState<File | null>(null)
  const backHref = diploma ? `/${diploma.id}` : "/"

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DiplomaFormValues>({
    resolver: zodResolver(diplomaSchema),
    defaultValues: {
      title: diploma?.title ?? "",
      description: diploma?.description ?? "",
    },
  })

  return (
    <form
      onSubmit={handleSubmit(async (values) => {
        try {
          const image = imageFile ? await uploadAdminImage(imageFile) : undefined
          const fields = { ...values, image }

          if (diploma) {
            await updateDiploma({ id: diploma.id, fields })
          } else {
            await createDiploma(fields)
          }

          router.push(backHref)
        } catch {
          // The request layer already shows the error as a toast.
        }
      })}
    >
      <PageHeader
        breadcrumbs={
          diploma
            ? [
                { label: "Diplomas", href: "/" },
                { label: diploma.title, href: backHref },
                { label: "Edit" },
              ]
            : [{ label: "Diplomas", href: "/" }, { label: "Add New Diploma" }]
        }
        title={diploma?.title}
        actions={<FormActions cancelHref={backHref} isSubmitting={isSubmitting} />}
      />

      <div className="p-6">
        <SectionCard title="Diploma Information">
          <div className="space-y-5 p-4">
            <FormField label="Image">
              <ImageUpload
                initialPreview={getImageUrl(diploma?.image)}
                onFileChange={setImageFile}
              />
            </FormField>

            <FormField label="Title" htmlFor="title" error={errors.title?.message}>
              <Input id="title" {...register("title")} aria-invalid={!!errors.title} />
            </FormField>

            <FormField
              label="Description"
              htmlFor="description"
              error={errors.description?.message}
            >
              <Textarea
                id="description"
                rows={5}
                {...register("description")}
                aria-invalid={!!errors.description}
                className="resize-none border-slate-300 focus-visible:border-blue-500 focus-visible:ring-0 rounded-none"
              />
            </FormField>
          </div>
        </SectionCard>
      </div>
    </form>
  )
}
