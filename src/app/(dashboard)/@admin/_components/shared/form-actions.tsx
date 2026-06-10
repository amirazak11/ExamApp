"use client"

import { Button } from "@/components/ui/button"

interface FormActionsProps {
  onCancel: () => void
  isSubmitting?: boolean
  submitLabel?: string
  submittingLabel?: string
}

export function FormActions({
  onCancel,
  isSubmitting,
  submitLabel = "Save",
  submittingLabel = "Saving...",
}: FormActionsProps) {
  return (
    <div className="flex justify-end gap-3 mt-4">
      <Button
        type="button"
        variant="outline"
        className="rounded-none px-6"
        onClick={onCancel}
      >
        Cancel
      </Button>
      <Button
        type="submit"
        className="rounded-none px-6 bg-blue-600 hover:bg-blue-700"
        disabled={isSubmitting}
      >
        {isSubmitting ? submittingLabel : submitLabel}
      </Button>
    </div>
  )
}
