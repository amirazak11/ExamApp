import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getImageUrl(image?: string | null) {
  if (!image) return null
  return image.startsWith("http")
    ? image
    : `https://exam-app.elevate-bootcamp.cloud${image}`
}
