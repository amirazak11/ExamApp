"use client"

import { useAdminExams } from "@/features/admin/_hooks/exams/hooks"
import { ExamsTable } from "./exams-table"

export function AdminExamsList() {
  const { data, isLoading, isError } = useAdminExams({ page: 1, limit: 20 })

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Something went wrong</p>

  return (
    <ExamsTable
      exams={data?.exams ?? []}
      total={data?.total ?? 0}
      page={data?.metadata?.page ?? 1}
      limit={data?.metadata?.limit ?? 20}
    />
  )
}
