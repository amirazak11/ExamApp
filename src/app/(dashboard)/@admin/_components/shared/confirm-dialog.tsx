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
import { TriangleAlert } from "lucide-react"

interface ConfirmDialogProps {
  title: string
  description?: string
  confirmLabel?: string
  onConfirm: () => void
  trigger?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function ConfirmDialog({
  title,
  description = "This action is permanent and cannot be undone.",
  confirmLabel = "Yes, Delete",
  onConfirm,
  trigger,
  open,
  onOpenChange,
}: ConfirmDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      {trigger && <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>}
      <AlertDialogContent className="gap-0 overflow-hidden rounded-none bg-white p-0">
        <AlertDialogHeader className="items-center px-8 py-8 text-center sm:text-center place-items-center">
          <div className="mb-3 flex size-20 items-center justify-center rounded-full bg-red-50">
            <div className="flex size-12 items-center justify-center rounded-full bg-red-100">
              <TriangleAlert className="size-6 text-red-600" />
            </div>
          </div>
          <AlertDialogTitle className="text-base font-semibold text-red-600">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-xs text-gray-500">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="grid grid-cols-2 gap-3 border-t border-gray-200 bg-gray-50 p-4 sm:grid">
          <AlertDialogCancel className="rounded-none border-0 bg-gray-200 text-gray-800 hover:bg-gray-300">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="rounded-none bg-red-600 text-white hover:bg-red-700"
            onClick={onConfirm}
          >
            {confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
