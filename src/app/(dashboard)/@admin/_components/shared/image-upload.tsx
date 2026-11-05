"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { ImageIcon, Trash2, Upload } from "lucide-react"
import { cn } from "@/lib/utils"

interface ImageUploadProps {
  initialPreview?: string | null
  onFileChange: (file: File | null) => void
}

export function ImageUpload({
  initialPreview = null,
  onFileChange,
}: ImageUploadProps) {
  const fileRef = useRef<HTMLInputElement>(null)
  const [file, setFileState] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [dragging, setDragging] = useState(false)
  const shownImage = preview ?? initialPreview

  function setFile(next: File | null) {
    if (next && !next.type.startsWith("image/")) return

    if (preview) URL.revokeObjectURL(preview)
    setPreview(next ? URL.createObjectURL(next) : null)
    setFileState(next)
    onFileChange(next)
    if (fileRef.current) fileRef.current.value = ""
  }

  return (
    <>
      {shownImage ? (
        <div className="flex items-center gap-3 border border-slate-300 p-2">
          <div className="relative size-14 shrink-0 overflow-hidden bg-gray-100">
            <Image src={shownImage} alt="Preview" fill unoptimized className="object-cover" />
          </div>
          <span className="min-w-0 flex-1 truncate text-xs text-gray-600">
            {file?.name ?? "Current image"}
          </span>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="p-1 text-gray-500 hover:text-blue-600"
            aria-label="Replace image"
          >
            <Upload className="size-4" />
          </button>
          {/* The API can't clear an image, so only a newly selected file can be removed. */}
          {file && (
            <button
              type="button"
              onClick={() => setFile(null)}
              className="p-1 text-red-500 hover:text-red-600"
              aria-label="Remove image"
            >
              <Trash2 className="size-4" />
            </button>
          )}
        </div>
      ) : (
        <div
          onClick={() => fileRef.current?.click()}
          onDragOver={(event) => {
            event.preventDefault()
            setDragging(true)
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(event) => {
            event.preventDefault()
            setDragging(false)
            setFile(event.dataTransfer.files?.[0] ?? null)
          }}
          className={cn(
            "flex h-24 w-full cursor-pointer items-center justify-center gap-2 border border-dashed text-xs text-gray-500",
            dragging ? "border-blue-400 bg-blue-50" : "border-slate-300 hover:bg-gray-50"
          )}
        >
          <ImageIcon className="size-4 text-gray-400" />
          <span>
            Drop an image here or{" "}
            <span className="text-blue-600 underline">select from your computer</span>
          </span>
        </div>
      )}
      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/gif,image/webp"
        className="hidden"
        onChange={(event) => setFile(event.target.files?.[0] ?? null)}
      />
    </>
  )
}
