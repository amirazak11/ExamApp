import { cn } from "@/lib/utils"

interface AdminSelectProps extends React.ComponentProps<"select"> {
  placeholder: string
  options: { value: string; label: string }[]
}

export function AdminSelect({
  placeholder,
  options,
  className,
  ...props
}: AdminSelectProps) {
  return (
    <select
      aria-label={placeholder}
      className={cn(
        "h-11 w-full rounded-none border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-500 disabled:bg-gray-100",
        className
      )}
      {...props}
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}
