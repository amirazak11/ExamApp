"use client"

import { Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface SearchFilterProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchFilter({
  value,
  onChange,
  placeholder = "Search...",
}: SearchFilterProps) {
  return (
    <div className="bg-white border border-gray-200">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100">
        <span className="text-sm font-medium text-blue-600">Search &amp; Filters</span>
      </div>
      <div className="flex items-center gap-2 p-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          <Input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="pl-9 h-9 border-gray-200 focus-visible:border-blue-400"
          />
        </div>
        <Button
          variant="outline"
          className="h-9 rounded-none border-gray-200 gap-2 text-gray-600 hover:border-blue-400 hover:text-blue-600"
        >
          <Filter className="size-4" />
          Filter
        </Button>
      </div>
    </div>
  )
}
