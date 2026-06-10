import type { User } from "@/features/auth/types/user"

export interface IAdminUser extends User {
  immutable?: boolean
  createdAt?: string
  updatedAt?: string
}

export interface IImmutablePayload {
  immutable: boolean
}

export interface IAdminDiplomaPayload {
  title?: string
  description?: string
  image?: string | null
}

export interface IAdminExamPayload extends IAdminDiplomaPayload {
  diplomaId?: string
  duration?: number
}
