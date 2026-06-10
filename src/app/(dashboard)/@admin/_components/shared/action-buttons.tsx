"use client"

import Link from "next/link"
import { Eye, MoreHorizontal, Pencil, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ActionButtonsProps {
  viewHref?: string
  editHref?: string
  addQuestionHref?: string
  onDelete?: () => void | Promise<void>
  disabledDelete?: boolean
  disabledDeleteTooltip?: string
}

export function ActionButtons({
  viewHref,
  editHref,
  addQuestionHref,
  onDelete,
  disabledDelete,
  disabledDeleteTooltip,
}: ActionButtonsProps) {
  return (
    <div className="flex items-center justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon-sm"
            className="text-gray-500 hover:bg-gray-100 hover:text-gray-900"
            aria-label="Open row actions"
          >
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="min-w-40 border border-gray-100 bg-white p-0">
        {viewHref && (
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href={viewHref}>
              <Eye className="size-4 text-blue-500" />
              View
            </Link>
          </DropdownMenuItem>
        )}

        {editHref && (
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href={editHref}>
              <Pencil className="size-4 text-amber-500" />
              Edit
            </Link>
          </DropdownMenuItem>
        )}

        {addQuestionHref && (
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href={addQuestionHref}>
              <Plus className="size-4 text-emerald-500" />
              Add Questions
            </Link>
          </DropdownMenuItem>
        )}

        {onDelete && (
          <DropdownMenuItem
            className="cursor-pointer text-red-600 focus:text-red-600"
            disabled={disabledDelete}
            onSelect={async (event) => {
              if (disabledDelete) return
              event.preventDefault()
              await onDelete()
            }}
          >
            <Trash2 className="size-4 text-red-500" />
            {disabledDelete && disabledDeleteTooltip
              ? disabledDeleteTooltip
              : "Delete"}
          </DropdownMenuItem>
        )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
