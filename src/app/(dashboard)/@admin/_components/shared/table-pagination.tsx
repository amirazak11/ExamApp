"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

type TablePaginationProps = {
  page: number
  totalPages: number
  total: number
  limit: number
  onPageChange: (page: number) => void
}

export function TablePagination({
  page,
  totalPages,
  total,
  limit,
  onPageChange,
}: TablePaginationProps) {
  const from = total === 0 ? 0 : (page - 1) * limit + 1
  const to = Math.min(page * limit, total)
  const pageCount = totalPages || 1

  return (
    <div className="flex items-center gap-3 text-xs text-gray-600">
      <span>
        {from} - {to} of {total}
      </span>
      <Button
        variant="outline"
        size="icon-sm"
        className="rounded-none border-gray-200 bg-white hover:bg-gray-50"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        aria-label="Previous page"
      >
        <ChevronLeft className="size-3.5" />
      </Button>
      <span>
        Page {page} of {pageCount}
      </span>
      <Button
        variant="outline"
        size="icon-sm"
        className="rounded-none border-gray-200 bg-white hover:bg-gray-50"
        disabled={page >= pageCount}
        onClick={() => onPageChange(page + 1)}
        aria-label="Next page"
      >
        <ChevronRight className="size-3.5" />
      </Button>
    </div>
  )
}
