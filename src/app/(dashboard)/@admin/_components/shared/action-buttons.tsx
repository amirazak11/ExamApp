"use client"

import { useState } from "react"
import Link from "next/link"
import { Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useIsSuperAdmin } from "@/features/admin/_hooks/use-is-super-admin"
import { ConfirmDialog } from "./confirm-dialog"

interface ActionButtonsProps {
  viewHref?: string
  editHref?: string
  onDelete?: () => void
  deleteTitle?: string
  immutable?: boolean
}

export function ActionButtons({
  viewHref,
  editHref,
  onDelete,
  deleteTitle = "Are you sure you want to delete this item?",
  immutable,
}: ActionButtonsProps) {
  const isSuperAdmin = useIsSuperAdmin()
  const [confirmOpen, setConfirmOpen] = useState(false)
  const locked = immutable && !isSuperAdmin

  return (
    <div className="flex items-center justify-end">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon-sm"
            className="rounded-none bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
            aria-label="Open row actions"
          >
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="min-w-36 rounded-none border border-gray-100 bg-white p-0">
          {viewHref && (
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href={viewHref}>
                <Eye className="size-4 text-gray-500" />
                View
              </Link>
            </DropdownMenuItem>
          )}

          {editHref && (
            <DropdownMenuItem asChild disabled={locked} className="cursor-pointer">
              <Link href={editHref}>
                <Pencil className="size-4 text-blue-500" />
                Edit
              </Link>
            </DropdownMenuItem>
          )}

          {onDelete && (
            <DropdownMenuItem
              className="cursor-pointer text-red-600 focus:text-red-600"
              disabled={locked}
              onSelect={() => setConfirmOpen(true)}
            >
              <Trash2 className="size-4 text-red-500" />
              Delete
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {onDelete && (
        <ConfirmDialog
          title={deleteTitle}
          onConfirm={onDelete}
          open={confirmOpen}
          onOpenChange={setConfirmOpen}
        />
      )}
    </div>
  )
}
