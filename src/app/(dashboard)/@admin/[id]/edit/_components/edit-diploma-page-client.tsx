"use client"

import { useAdminDiploma } from "@/features/admin/_hooks/diplomas/hooks"
import { DiplomaForm } from "../../../_components/diploma-form"

type EditDiplomaPageClientProps = {
  id: string
}

export function EditDiplomaPageClient({ id }: EditDiplomaPageClientProps) {
  const { data: diploma, isLoading, isError } = useAdminDiploma(id)

  if (isLoading) return <div className="p-6">Loading...</div>

  if (isError || !diploma) {
    return (
      <div className="p-6">
        <p className="text-gray-500 text-sm">Diploma not found.</p>
      </div>
    )
  }

  return <DiplomaForm diploma={diploma} />
}
