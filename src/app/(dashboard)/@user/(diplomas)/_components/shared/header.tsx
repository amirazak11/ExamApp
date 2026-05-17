import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"
import BackButton from "./backbutton"

type HeaderProps = {
  title: string
  icon?: LucideIcon
  className?: string
  backbutton?: boolean;
}

export function Header({ title, icon: Icon, className ,backbutton }: HeaderProps) {
  return (
    <div className="flex gap-2 mb-6 ">
        {backbutton && <BackButton />}
    <div
      className={cn(
        "flex items-center gap-2  bg-blue-600 px-4 py-3 text-white flex-1",
        className
      )}
    >
      {Icon && <Icon className="size-6" />}
      <h1 className="text-xl font-bold">{title}</h1>
    </div>
    </div>
  )
}