"use client"

import { useMemo } from "react"
import useDiplomaList from "@/features/doplomas/_hooks/use-diplomas-list"
import type { IDiploma } from "@/lib/types/IDiploma"
import { DiplomaTable } from "./diploma-table"

export function AdminDiplomasList() {
  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useDiplomaList()

  const diplomas: IDiploma[] = useMemo(() => {
    return (data?.pages ?? []).flatMap((page) => page?.data ?? [])
  }, [data])

  const metadata = data?.pages.at(-1)?.metadata
  const total = metadata?.total ?? diplomas.length
  const page = metadata?.page ?? 1
  const limit = metadata?.limit ?? 10

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Something went wrong</p>

  return (
    <DiplomaTable
      diplomas={diplomas}
      total={total}
      page={page}
      limit={limit}
      onNextPage={hasNextPage ? () => fetchNextPage() : undefined}
    />
  )
}
