import { cn } from "@/lib/utils"

interface SectionCardProps {
  title: string
  children: React.ReactNode
  className?: string
  actions?: React.ReactNode
}

export function SectionCard({ title, children, className, actions }: SectionCardProps) {
  return (
    <div className={cn("bg-white border border-gray-200", className)}>
      <div className="bg-blue-600 px-5 py-3 flex items-center justify-between">
        <h2 className="text-white font-semibold text-sm">{title}</h2>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
      {children}
    </div>
  )
}
