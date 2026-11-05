interface DetailFieldProps {
  label: string
  children: React.ReactNode
}

export function DetailField({ label, children }: DetailFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs text-gray-400">{label}</span>
      <div className="text-sm text-gray-900">{children}</div>
    </div>
  )
}
