import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

interface FormFieldProps {
  label: string
  htmlFor?: string
  error?: string
  required?: boolean
  children: React.ReactNode
  className?: string
}

export function FormField({
  label,
  htmlFor,
  error,
  required,
  children,
  className,
}: FormFieldProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label
        htmlFor={htmlFor}
        className="text-xs font-medium text-gray-500 uppercase tracking-wide"
      >
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </Label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
