"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { getImageUrl } from "@/lib/utils"
import {
  useAdminDiploma,
  useDeleteAdminDiploma,
  useSetAdminDiplomaImmutable,
} from "@/features/admin/_hooks/diplomas/hooks"
import { DetailActions } from "../../_components/shared/detail-actions"
import { DetailField } from "../../_components/shared/detail-field"
import { PageHeader } from "../../_components/shared/page-header"

type DiplomaDetailProps = {
  id: string
}

export function DiplomaDetail({ id }: DiplomaDetailProps) {
  const router = useRouter()
  const { data: diploma, isLoading, isError } = useAdminDiploma(id)
  const { mutate: deleteDiploma } = useDeleteAdminDiploma()
  const { mutate: setImmutable, isPending: isSettingImmutable } =
    useSetAdminDiplomaImmutable()

  if (isLoading) return <div className="p-6">Loading...</div>

  if (isError || !diploma) {
    return (
      <>
        <PageHeader
          breadcrumbs={[{ label: "Diplomas", href: "/" }, { label: "Not found" }]}
        />
        <div className="p-6">
          <p className="text-gray-500 text-sm">Diploma not found.</p>
        </div>
      </>
    )
  }

  const imageUrl = getImageUrl(diploma.image)

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "Diplomas", href: "/" }, { label: diploma.title }]}
        title={diploma.title}
        actions={
          <DetailActions
            immutable={diploma.immutable}
            isSettingImmutable={isSettingImmutable}
            onSetImmutable={(immutable) => setImmutable({ id, immutable })}
            editHref={`/${id}/edit`}
            deleteTitle={`Are you sure you want to delete "${diploma.title}"?`}
            onDelete={() =>
              deleteDiploma(id, { onSuccess: () => router.push("/") })
            }
          />
        }
      />

      <div className="p-6">
        <div className="space-y-4 bg-white p-4">
          <DetailField label="Image">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={diploma.title}
                width={240}
                height={240}
                unoptimized
                className="size-60 object-cover"
              />
            ) : (
              <span className="text-gray-400">No image</span>
            )}
          </DetailField>
          <DetailField label="Title">{diploma.title}</DetailField>
          <DetailField label="Description">
            <p className="leading-relaxed">{diploma.description}</p>
          </DetailField>
        </div>
      </div>
    </>
  )
}
