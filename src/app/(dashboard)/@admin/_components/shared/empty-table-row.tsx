import { TableCell, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"

interface EmptyTableRowProps {
  colSpan: number
  message: string
  className?: string
}

export function EmptyTableRow({
  colSpan,
  message,
  className,
}: EmptyTableRowProps) {
  return (
    <TableRow>
      <TableCell
        colSpan={colSpan}
        className={cn("py-10 text-center text-gray-400", className)}
      >
        {message}
      </TableCell>
    </TableRow>
  )
}
