import type { IAuditLog } from "@/features/audit/types/audit-log"
import type {
  ICreateQuestionWithExamPayload,
  IBulkQuestionsPayload,
  IQuestion,
  IUpdateQuestionPayload,
} from "@/features/questions/types/questions"
import type { IApiResponse, IPaginatedResponse } from "@/lib/types/api"
import type { IDiploma } from "@/lib/types/IDiploma"
import type { IExam } from "@/lib/types/comment"
import type {
  IAdminDiplomaPayload,
  IAdminExamPayload,
  IAdminUser,
  IImmutablePayload,
} from "../types/admin"

type PaginationOptions = {
  page?: number
  limit?: number
  search?: string
}

function buildQuery({ page = 1, limit = 20, search }: PaginationOptions = {}) {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  })

  if (search) params.set("search", search)

  return params.toString()
}

async function parseApiResponse<T>(response: Response) {
  const data: IApiResponse<T> = await response.json()

  if (!response.ok || data.status !== true) {
    throw new Error(data.message || "Request failed")
  }

  return data
}

async function request<T>(path: string, init?: RequestInit) {
  const response = await fetch(path, {
    ...init,
    headers: {
      ...(init?.body ? { "content-type": "application/json" } : {}),
      ...init?.headers,
    },
  })

  return parseApiResponse<T>(response)
}

export async function fetchAdminDiplomas(options: PaginationOptions = {}) {
  const data = await request<IPaginatedResponse<IDiploma>>(
    `/api/admin/diplomas?${buildQuery(options)}`
  )

  return data.payload
}

export async function fetchAdminDiploma(id: string) {
  const data = await request<IDiploma>(`/api/admin/diplomas/${id}`)

  return data.payload ?? null
}

export async function createAdminDiploma(fields: IAdminDiplomaPayload) {
  return request<IDiploma>("/api/admin/diplomas", {
    method: "POST",
    body: JSON.stringify(fields),
  })
}

export async function updateAdminDiploma(
  id: string,
  fields: IAdminDiplomaPayload
) {
  return request<IDiploma>(`/api/admin/diplomas/${id}`, {
    method: "PUT",
    body: JSON.stringify(fields),
  })
}

export async function deleteAdminDiploma(id: string) {
  return request<null>(`/api/admin/diplomas/${id}`, {
    method: "DELETE",
  })
}

export async function fetchAdminExams(options: PaginationOptions = {}) {
  const data = await request<IPaginatedResponse<IExam>>(
    `/api/admin/exams?${buildQuery(options)}`
  )

  return {
    exams: data.payload?.data ?? [],
    total: data.payload?.metadata?.total ?? 0,
    metadata: data.payload?.metadata,
  }
}

export async function fetchAdminExam(id: string) {
  const data = await request<IExam>(`/api/admin/exams/${id}`)

  return data.payload ?? null
}

export async function createAdminExam(fields: IAdminExamPayload) {
  return request<IExam>("/api/admin/exams", {
    method: "POST",
    body: JSON.stringify(fields),
  })
}

export async function updateAdminExam(id: string, fields: IAdminExamPayload) {
  return request<IExam>(`/api/admin/exams/${id}`, {
    method: "PUT",
    body: JSON.stringify(fields),
  })
}

export async function deleteAdminExam(id: string) {
  return request<null>(`/api/admin/exams/${id}`, {
    method: "DELETE",
  })
}

export async function fetchAdminQuestionsByExam(examId: string) {
  const data = await request<{ questions: IQuestion[] }>(
    `/api/admin/questions/exam/${examId}`
  )

  return data.payload?.questions ?? []
}

export async function fetchAdminQuestion(id: string) {
  const data = await request<IQuestion>(`/api/admin/questions/${id}`)

  return data.payload ?? null
}

export async function createAdminQuestion(fields: ICreateQuestionWithExamPayload) {
  return request<IQuestion>("/api/admin/questions", {
    method: "POST",
    body: JSON.stringify(fields),
  })
}

export async function createBulkAdminQuestions(
  examId: string,
  fields: IBulkQuestionsPayload
) {
  return request<IQuestion[]>(`/api/admin/questions/exam/${examId}/bulk`, {
    method: "POST",
    body: JSON.stringify(fields),
  })
}

export async function updateAdminQuestion(
  id: string,
  fields: IUpdateQuestionPayload
) {
  return request<IQuestion>(`/api/admin/questions/${id}`, {
    method: "PUT",
    body: JSON.stringify(fields),
  })
}

export async function deleteAdminQuestion(id: string) {
  return request<null>(`/api/admin/questions/${id}`, {
    method: "DELETE",
  })
}

export async function fetchAdminAuditLogs(options: PaginationOptions = {}) {
  const data = await request<IPaginatedResponse<IAuditLog>>(
    `/api/admin/audit-logs?${buildQuery(options)}`
  )

  return {
    data: data.payload?.data ?? [],
    total: data.payload?.metadata?.total ?? 0,
    metadata: data.payload?.metadata,
  }
}

export async function fetchAdminAuditLog(id: string) {
  const data = await request<IAuditLog>(`/api/admin/audit-logs/${id}`)

  return data.payload ?? null
}

export async function clearAdminAuditLogs() {
  return request<null>("/api/admin/audit-logs", {
    method: "DELETE",
  })
}

export async function deleteAdminAuditLog(id: string) {
  return request<null>(`/api/admin/audit-logs/${id}`, {
    method: "DELETE",
  })
}

export async function fetchAdminUsers(options: PaginationOptions = {}) {
  const data = await request<IPaginatedResponse<IAdminUser>>(
    `/api/admin/users?${buildQuery(options)}`
  )

  return {
    users: data.payload?.data ?? [],
    total: data.payload?.metadata?.total ?? 0,
    metadata: data.payload?.metadata,
  }
}

export async function runAdminSeed() {
  return request<unknown>("/api/admin/seed", {
    method: "POST",
  })
}

export async function setAdminImmutable(
  path: string,
  fields: IImmutablePayload
) {
  return request<unknown>(path, {
    method: "PATCH",
    body: JSON.stringify(fields),
  })
}
