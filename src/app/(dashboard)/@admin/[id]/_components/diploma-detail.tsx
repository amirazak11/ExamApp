"use client"

import Image from "next/image"
import Link from "next/link"
import { Download, FolderCodeIcon, Lock, Pencil, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { AppBreadcrumb } from "@/app/(dashboard)/@user/(diplomas)/_components/shared/breadcremb"
import { Header } from "@/app/(dashboard)/@user/(diplomas)/_components/shared/header"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  useAdminDiploma,
  useDeleteAdminDiploma,
  useSetAdminDiplomaImmutable,
} from "@/features/admin/_hooks/diplomas/hooks"
import { ConfirmDialog } from "../../_components/shared/confirm-dialog"
import { SectionCard } from "../../_components/shared/section-card"

type DiplomaDetailProps = {
  id: string
}

export function DiplomaDetail({ id }: DiplomaDetailProps) {
  const router = useRouter()
  const { data: diploma, isLoading, isError } = useAdminDiploma(id)
  const { mutateAsync: deleteDiploma } = useDeleteAdminDiploma()
  const { mutateAsync: setImmutable, isPending: isSettingImmutable } =
    useSetAdminDiplomaImmutable()

  if (isLoading) return <div className="p-6">Loading...</div>

  if (isError || !diploma) {
    return (
      <>
        <AppBreadcrumb
          items={[{ label: "Diplomas", href: "/" }, { label: "Not found" }]}
        />
        <div className="p-6">
          <p className="text-gray-500 text-sm">Diploma not found.</p>
        </div>
      </>
    )
  }

  return (
    <TooltipProvider>
      <AppBreadcrumb
        items={[{ label: "Diplomas", href: "/" }, { label: diploma.title }]}
      />
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <Header
            title={diploma.title}
            icon={FolderCodeIcon}
            className="flex-1"
            backbutton
          />
          <div className="flex items-center gap-2 shrink-0">
            {diploma.image && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={`https://exam-app.elevate-bootcamp.cloud${diploma.image}`}
                    download
                    className="inline-flex items-center gap-2 border border-gray-300 px-4 py-2.5 text-sm text-gray-700 hover:border-blue-400 hover:text-blue-600 transition-colors"
                  >
                    <Download className="size-4" />
                    Download
                  </a>
                </TooltipTrigger>
                <TooltipContent>Download diploma image</TooltipContent>
              </Tooltip>
            )}

            <Button
              variant="outline"
              className="rounded-none border-gray-300 gap-2 text-gray-700 hover:border-amber-400 hover:text-amber-600"
              asChild
            >
              <Link href={`/${id}/edit`}>
                <Pencil className="size-4" />
                Edit
              </Link>
            </Button>

            <Button
              variant="ghost"
              className="rounded-none gap-2 text-gray-500 border border-gray-300 hover:border-blue-400 hover:text-blue-600"
              disabled={diploma.immutable || isSettingImmutable}
              onClick={() => setImmutable({ id, immutable: true })}
            >
              <Lock className="size-4" />
              {diploma.immutable ? "Immutable" : "Make Immutable"}
            </Button>

            <ConfirmDialog
              title="Delete Diploma"
              description={`Are you sure you want to delete "${diploma.title}"? This action cannot be undone.`}
              onConfirm={async () => {
                await deleteDiploma(id)
                router.push("/")
              }}
              disabled={diploma.immutable}
              trigger={
                <Button
                  variant="destructive"
                  className="rounded-none gap-2"
                  disabled={diploma.immutable}
                >
                  <Trash2 className="size-4" />
                  Delete
                </Button>
              }
            />
          </div>
        </div>

        <SectionCard title="Diploma Information">
          <div className="p-6 space-y-6">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Image
              </span>
              <div className="w-48 h-48 border border-gray-200 bg-gray-50 overflow-hidden flex items-center justify-center">
                {diploma.image ? (
                  <Image
                    src={`https://exam-app.elevate-bootcamp.cloud${diploma.image}`}
                    alt={diploma.title}
                    width={192}
                    height={192}
                    unoptimized
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <span className="text-sm text-gray-400">No image</span>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Title
              </span>
              <p className="text-gray-800 font-medium">{diploma.title}</p>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Description
              </span>
              <p className="text-gray-600 text-sm leading-relaxed">
                {diploma.description}
              </p>
            </div>
          </div>
        </SectionCard>
      </div>
    </TooltipProvider>
  )
}
