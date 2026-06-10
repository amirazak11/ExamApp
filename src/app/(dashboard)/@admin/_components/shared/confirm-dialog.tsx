"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

interface ConfirmDialogProps {
  title?: string
  description?: string
  onConfirm: () => void
  trigger?: React.ReactNode
  disabled?: boolean
}

export function ConfirmDialog({
  title = "Are you sure?",
  description = "This action cannot be undone.",
  onConfirm,
  trigger,
  disabled,
}: ConfirmDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {trigger ?? (
          <Button
            variant="destructive"
            size="sm"
            className="gap-2"
            disabled={disabled}
          >
            <Trash2 className="size-4" />
            Delete
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent className="rounded-none">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="rounded-none">Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="rounded-none bg-red-500 hover:bg-red-600 text-white"
            onClick={onConfirm}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
