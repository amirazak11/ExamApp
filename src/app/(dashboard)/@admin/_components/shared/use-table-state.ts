"use client"

import { useState } from "react"

export function useTableState<TFilters extends Record<string, string>>(
  emptyFilters: TFilters,
  limit: number
) {
  const [page, setPage] = useState(1)
  const [sort, setSortValue] = useState("createdAt:desc")
  const [draft, setDraft] = useState(emptyFilters)
  const [filters, setFilters] = useState(emptyFilters)
  const [sortBy, sortOrder] = sort.split(":")

  return {
    page,
    setPage,
    sort,
    setSort: (value: string) => {
      setSortValue(value)
      setPage(1)
    },
    draft,
    setDraftField: (field: keyof TFilters, value: string) =>
      setDraft((current) => ({ ...current, [field]: value })),
    apply: () => {
      setFilters(draft)
      setPage(1)
    },
    clear: () => {
      setDraft(emptyFilters)
      setFilters(emptyFilters)
      setPage(1)
    },
    query: { page, limit, sortBy, sortOrder, ...filters },
  }
}
