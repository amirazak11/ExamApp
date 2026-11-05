"use client"

import { ArrowUpDown, Check } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface SortMenuProps {
  value: string
  options: { value: string; label: string }[]
  onChange: (value: string) => void
}

export function SortMenu({ value, options, onChange }: SortMenuProps) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="ml-auto flex items-center gap-1.5 outline-none">
        Sort
        <ArrowUpDown className="size-3.5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="rounded-none border border-gray-100 bg-white p-0">
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            className="cursor-pointer justify-between gap-4"
            onSelect={() => onChange(option.value)}
          >
            {option.label}
            {option.value === value && <Check className="size-3.5 text-blue-600" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
