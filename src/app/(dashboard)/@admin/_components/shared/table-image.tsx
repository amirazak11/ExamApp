import Image from "next/image"
import { getImageUrl } from "@/lib/utils"

interface TableImageProps {
  image?: string | null
  alt: string
}

export function TableImage({ image, alt }: TableImageProps) {
  const src = getImageUrl(image)

  return (
    <div className="flex size-12 items-center justify-center overflow-hidden bg-gray-100">
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={48}
          height={48}
          unoptimized
          className="size-full object-cover"
        />
      ) : (
        <span className="text-xs text-gray-400">No img</span>
      )}
    </div>
  )
}
