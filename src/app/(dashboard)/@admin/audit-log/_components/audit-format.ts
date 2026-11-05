import type { IAuditLog } from "@/features/audit/types/audit-log"

export const ACTION_CLASSES: Record<IAuditLog["action"], string> = {
  CREATE: "text-emerald-600",
  UPDATE: "text-amber-600",
  DELETE: "text-red-600",
  SET_IMMUTABLE: "text-blue-600",
  SEED_DATA: "text-gray-600",
}

export const ROLE_LABELS: Record<IAuditLog["actorRole"], string> = {
  SUPER_ADMIN: "Super Admin",
  ADMIN: "Admin",
  USER: "User",
}

export const ROLE_CLASSES: Record<IAuditLog["actorRole"], string> = {
  SUPER_ADMIN: "text-red-600",
  ADMIN: "text-blue-600",
  USER: "text-gray-600",
}

export function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
}

// Questions have no standalone route because their URL needs the exam id.
export function getEntityHref(log: IAuditLog) {
  if (!log.entityId) return null
  if (log.category === "DIPLOMA") return `/${log.entityId}`
  if (log.category === "EXAM") return `/exams/${log.entityId}`
  return null
}

export function formatTime(date: string) {
  return new Date(date).toLocaleTimeString("en-US")
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}
