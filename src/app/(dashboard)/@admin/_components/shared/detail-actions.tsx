"use client"

import Link from "next/link"
import { Ban, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useIsSuperAdmin } from "@/features/admin/_hooks/use-is-super-admin"
import { ConfirmDialog } from "./confirm-dialog"

interface DetailActionsProps {
  immutable: boolean
  isSettingImmutable: boolean
  onSetImmutable: (immutable: boolean) => void
  editHref: string
  deleteTitle: string
  onDelete: () => void
}

export function DetailActions({
  immutable,
  isSettingImmutable,
  onSetImmutable,
  editHref,
  deleteTitle,
  onDelete,
}: DetailActionsProps) {
  const isSuperAdmin = useIsSuperAdmin()
  const locked = immutable && !isSuperAdmin
  const editClassName = "rounded-none gap-2 bg-blue-600 text-white hover:bg-blue-700"

  return (
    <>
      <Button
        variant="secondary"
        className="rounded-none gap-2 bg-gray-200 text-gray-800 hover:bg-gray-300"
        disabled={!isSuperAdmin || isSettingImmutable}
        onClick={() => onSetImmutable(!immutable)}
      >
        <Ban className="size-4" />
        {immutable ? "Immutable" : "Make Immutable"}
      </Button>

      {locked ? (
        <Button className={editClassName} disabled>
          <Pencil className="size-4" />
          Edit
        </Button>
      ) : (
        <Button className={editClassName} asChild>
          <Link href={editHref}>
            <Pencil className="size-4" />
            Edit
          </Link>
        </Button>
      )}

      <ConfirmDialog
        title={deleteTitle}
        onConfirm={onDelete}
        trigger={
          <Button
            className="rounded-none gap-2 bg-red-600 text-white hover:bg-red-700"
            disabled={locked}
          >
            <Trash2 className="size-4" />
            Delete
          </Button>
        }
      />
    </>
  )
}
