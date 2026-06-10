"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { ImagePlus, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface ImageUploadProps {
  label?: string
  initialPreview?: string | null
  previewAlt?: string
  onFileChange?: (file: File | null) => void
}

export function ImageUpload({
  label = "Drop an image here or select from your computer",
  initialPreview = null,
  previewAlt = "preview",
  onFileChange,
}: ImageUploadProps) {
  const fileRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(initialPreview)
  const [dragging, setDragging] = useState(false)

  function setFile(file: File | null) {
    if (file && !file.type.startsWith("image/")) return

    setPreview((currentPreview) => {
      if (currentPreview) URL.revokeObjectURL(currentPreview)
      return file ? URL.createObjectURL(file) : null
    })
    onFileChange?.(file)
  }

  function clearImage() {
    setFile(null)
    if (fileRef.current) fileRef.current.value = ""
  }

  return (
    <>
      {preview ? (
        <div className="relative w-48 h-48 border border-gray-200 overflow-hidden">
          <Image src={preview} alt={previewAlt} fill className="object-cover" />
          <button
            type="button"
            onClick={clearImage}
            className="absolute top-1 right-1 bg-white border border-gray-200 p-0.5 hover:bg-red-50 hover:border-red-300 transition-colors"
            aria-label="Remove image"
          >
            <X className="size-3.5 text-gray-500" />
          </button>
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
            "w-full max-w-md h-36 border-2 border-dashed flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors",
            dragging
              ? "border-blue-400 bg-blue-50"
              : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
          )}
        >
          <ImagePlus className="size-6 text-gray-400" />
          <p className="text-sm text-gray-400 text-center px-4">{label}</p>
        </div>
      )}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => setFile(event.target.files?.[0] ?? null)}
      />
    </>
  )
}
