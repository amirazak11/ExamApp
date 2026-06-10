"use client"

import Image from "next/image"
import type { IDiploma } from "@/lib/types/IDiploma"
import {
  AdminDataTable,
  type AdminTableColumn,
} from "./shared/admin-data-table"
import { ActionButtons } from "./shared/action-buttons"
import { useDeleteAdminDiploma } from "@/features/admin/_hooks/diplomas/hooks"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type DiplomaTableProps = {
  diplomas: IDiploma[]
  total: number
  page: number
  limit: number
  onNextPage?: () => void
}

export function DiplomaTable({
  diplomas,
  total,
  page,
  limit,
  onNextPage,
}: DiplomaTableProps) {
  const { mutateAsync: deleteDiploma } = useDeleteAdminDiploma()

  const columns: AdminTableColumn<IDiploma>[] = [
    {
      key: "image",
      header: "Image",
      headClassName: "w-20",
      cell: (diploma) => (
        <div className="size-12 bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden">
          {diploma.image ? (
            <Image
              src={`https://exam-app.elevate-bootcamp.cloud${diploma.image}`}
              alt={diploma.title}
              width={48}
              height={48}
              unoptimized
              className="object-cover"
            />
          ) : (
            <span className="text-xs text-gray-400">No img</span>
          )}
        </div>
      ),
    },
    {
      key: "title",
      header: "Title",
      headClassName: "w-48",
      className: "font-medium text-gray-800",
      cell: (diploma) => (
        <Tooltip>
          <TooltipTrigger asChild>
            <p className="max-w-40 truncate">{diploma.title}</p>
          </TooltipTrigger>
          <TooltipContent>{diploma.title}</TooltipContent>
        </Tooltip>
      ),
    },
    {
      key: "description",
      header: "Description",
      className: "text-gray-500 max-w-xs",
      cell: (diploma) => (
        <Tooltip>
          <TooltipTrigger asChild>
            <p className="line-clamp-2">{diploma.description}</p>
          </TooltipTrigger>
          <TooltipContent className="max-w-sm">
            {diploma.description}
          </TooltipContent>
        </Tooltip>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      headClassName: "w-28 text-right",
      cell: (diploma) => (
        <ActionButtons
          viewHref={`/${diploma.id}`}
          editHref={`/${diploma.id}/edit`}
          onDelete={async () => {
            await deleteDiploma(diploma.id)
          }}
          disabledDelete={diploma.immutable}
          disabledDeleteTooltip="Only super admin can delete immutable diplomas"
        />
      ),
    },
  ]

  return (
    <TooltipProvider>
      <AdminDataTable
        data={diplomas}
        columns={columns}
        getRowKey={(diploma) => diploma.id}
        searchPlaceholder="Search diplomas..."
        searchPredicate={(diploma, query) =>
          diploma.title.toLowerCase().includes(query) ||
          diploma.description.toLowerCase().includes(query)
        }
        emptyMessage="No diplomas found."
        page={page}
        totalPages={Math.ceil(total / limit)}
        total={total}
        limit={limit}
        onPageChange={(nextPage) => {
          if (nextPage > page) onNextPage?.()
        }}
      />
    </TooltipProvider>
  )
}
