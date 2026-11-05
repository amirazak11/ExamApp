import { cn } from "@/lib/utils"

interface SectionCardProps {
  title: string
  children: React.ReactNode
  className?: string
  actions?: React.ReactNode
}

export function SectionCard({ title, children, className, actions }: SectionCardProps) {
  return (
    <div className={cn("bg-white", className)}>
      <div className="bg-blue-600 px-4 py-2.5 flex items-center justify-between">
        <h2 className="text-white font-medium text-sm">{title}</h2>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
      {children}
    </div>
  )
}
