"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type TablePaginationProps = {
  page: number
  totalPages: number
  total: number
  limit: number
  onPageChange: (page: number) => void
  borderless?: boolean
}

export function TablePagination({
  page,
  totalPages,
  total,
  limit,
  onPageChange,
  borderless = false,
}: TablePaginationProps) {
  const from = total === 0 ? 0 : (page - 1) * limit + 1
  const to = Math.min(page * limit, total)
  const pageCount = totalPages || 1

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 px-4 py-3 text-xs text-gray-500 ",
        borderless ? "min-w-0 px-0 py-0" : "border-b border-gray-100"
      )}
    >
      <span>
        {from} - {to} of {total}
      </span>
      <div className="flex items-center gap-3">
        <span>
          Page {page} of {pageCount}
        </span>
        <div className="flex">
          <Button
            variant="outline"
            size="icon-sm"
            className="rounded-none border-gray-200 hover:bg-gray-50"
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
            aria-label="Previous page"
          >
            <ChevronLeft className="size-3.5" />
          </Button>
          <Button
            variant="outline"
            size="icon-sm"
            className="rounded-none border-l-0 border-gray-200 hover:bg-gray-50"
            disabled={page >= pageCount}
            onClick={() => onPageChange(page + 1)}
            aria-label="Next page"
          >
            <ChevronRight className="size-3.5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
