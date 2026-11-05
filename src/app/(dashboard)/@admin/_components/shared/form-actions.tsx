"use client"

import Link from "next/link"
import { Save, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FormActionsProps {
  cancelHref: string
  isSubmitting?: boolean
}

export function FormActions({ cancelHref, isSubmitting }: FormActionsProps) {
  return (
    <>
      <Button
        variant="secondary"
        className="rounded-none gap-2 bg-gray-200 text-gray-800 hover:bg-gray-300"
        asChild
      >
        <Link href={cancelHref}>
          <X className="size-4" />
          Cancel
        </Link>
      </Button>
      <Button
        type="submit"
        className="rounded-none gap-2 bg-emerald-500 text-white hover:bg-emerald-600"
        disabled={isSubmitting}
      >
        <Save className="size-4" />
        {isSubmitting ? "Saving..." : "Save"}
      </Button>
    </>
  )
}
