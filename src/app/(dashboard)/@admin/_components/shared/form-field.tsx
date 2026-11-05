import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

interface FormFieldProps {
  label: string
  htmlFor?: string
  error?: string
  children: React.ReactNode
  className?: string
}

export function FormField({
  label,
  htmlFor,
  error,
  children,
  className,
}: FormFieldProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label htmlFor={htmlFor} className="text-sm font-medium text-gray-800">
        {label}
      </Label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
