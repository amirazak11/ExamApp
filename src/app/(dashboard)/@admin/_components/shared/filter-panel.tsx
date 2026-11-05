"use client"

import { useState } from "react"
import { SlidersHorizontal, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FilterPanelProps {
  children: React.ReactNode
  onClear: () => void
  onApply: () => void
}

export function FilterPanel({ children, onClear, onApply }: FilterPanelProps) {
  const [hidden, setHidden] = useState(false)

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between bg-blue-600 px-4 py-2.5 text-white">
        <span className="flex items-center gap-2 text-sm font-medium">
          <SlidersHorizontal className="size-4" />
          Search &amp; Filters
        </span>
        <button
          type="button"
          onClick={() => setHidden(!hidden)}
          className="inline-flex items-center gap-1 text-xs text-white/90 hover:text-white"
        >
          <X className="size-3" />
          {hidden ? "Show" : "Hide"}
        </button>
      </div>

      {!hidden && (
        <form
          className="space-y-3 p-4"
          onSubmit={(event) => {
            event.preventDefault()
            onApply()
          }}
        >
          {children}
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              className="rounded-none px-6 text-gray-600"
              onClick={onClear}
            >
              Clear
            </Button>
            <Button
              type="submit"
              variant="secondary"
              className="rounded-none bg-gray-200 px-6 text-gray-800 hover:bg-gray-300"
            >
              Apply
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}
