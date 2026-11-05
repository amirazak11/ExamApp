export type PaginationOptions = {
  page?: number
  limit?: number
  search?: string
  sortBy?: string
  sortOrder?: string
  immutable?: string
  diplomaId?: string
  category?: string
  action?: string
  actorUserId?: string
}

export type ImmutableVariables = {
  id: string
  immutable: boolean
}

export const adminQueryKeys = {
  all: ["admin"] as const,
  diplomas: (options: PaginationOptions = {}) =>
    [...adminQueryKeys.all, "diplomas", options] as const,
  diploma: (id: string) => [...adminQueryKeys.all, "diplomas", id] as const,
  exams: (options: PaginationOptions = {}) =>
    [...adminQueryKeys.all, "exams", options] as const,
  exam: (id: string) => [...adminQueryKeys.all, "exams", id] as const,
  questions: (examId: string, sort?: string) =>
    [...adminQueryKeys.all, "questions", examId, sort] as const,
  question: (id: string) => [...adminQueryKeys.all, "questions", id] as const,
  auditLogs: (options: PaginationOptions = {}) =>
    [...adminQueryKeys.all, "audit-logs", options] as const,
  auditLog: (id: string) => [...adminQueryKeys.all, "audit-logs", id] as const,
  users: (options: PaginationOptions = {}) =>
    [...adminQueryKeys.all, "users", options] as const,
}
