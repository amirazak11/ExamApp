"use server"

import { Headers } from "@/components/constants/api.constants"
import { getNextAuthToken } from "@/features/auth/api/util/auth.util"
import type { IAuditLog } from "@/features/audit/types/audit-log"
import type {
  IAdminDiplomaPayload,
  IAdminExamPayload,
  IAdminUser,
  IImmutablePayload,
} from "../types/admin"
import type { IApiResponse, IPaginatedResponse } from "@/lib/types/api"
import type { IDiploma } from "@/lib/types/IDiploma"
import type { IExam } from "@/lib/types/comment"
import type {
  ICreateQuestionWithExamPayload,
  IQuestion,
  IUpdateQuestionPayload,
} from "@/features/questions/types/questions"


type PaginationOptions = {
  page?: number
  limit?: number
  search?: string
}

async function getAuthHeaders() {
  const jwt = await getNextAuthToken()
  const token = jwt?.token

  if (!token) {
    throw new Error("Unauthorized: No token found")
  }

  return Headers.authorization(token as string)
}

async function parseApiResponse<T>(response: Response) {
  const payload: IApiResponse<T> = await response.json()

  if (!response.ok || payload.status !== true) {
    throw new Error(payload.message || "Request failed")
  }

  return payload
}

function buildQuery({ page = 1, limit = 20, search }: PaginationOptions) {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  })

  if (search) params.set("search", search)

  return params.toString()
}

export async function getAdminAuditLogsAction(options: PaginationOptions = {}) {
  const authHeaders = await getAuthHeaders()
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/audit-logs?${buildQuery(options)}`,
    {
      headers: authHeaders,
      cache: "no-store",
    }
  )

  const data = await parseApiResponse<IPaginatedResponse<IAuditLog>>(response)

  return {
    data: data.payload?.data ?? [],
    total: data.payload?.metadata?.total ?? 0,
  }
}

export async function clearAdminAuditLogsAction() {
  const authHeaders = await getAuthHeaders()
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/audit-logs`, {
    method: "DELETE",
    headers: authHeaders,
  })

  return parseApiResponse<null>(response)
}

export async function getAdminAuditLogByIdAction(id: string) {
  const authHeaders = await getAuthHeaders()
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/audit-logs/${id}`, {
    headers: authHeaders,
    cache: "no-store",
  })

  const data = await parseApiResponse<IAuditLog>(response)
  return data.payload ?? null
}

export async function deleteAdminAuditLogAction(id: string) {
  const authHeaders = await getAuthHeaders()
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/audit-logs/${id}`, {
    method: "DELETE",
    headers: authHeaders,
  })

  return parseApiResponse<null>(response)
}

export async function getAdminUsersAction(options: PaginationOptions = {}) {
  const authHeaders = await getAuthHeaders()
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/users?${buildQuery(options)}`, {
    headers: authHeaders,
    cache: "no-store",
  })

  const data = await parseApiResponse<IPaginatedResponse<IAdminUser>>(response)

  return {
    users: data.payload?.data ?? [],
    total: data.payload?.metadata?.total ?? 0,
  }
}

export async function runAdminSeedAction() {
  const authHeaders = await getAuthHeaders()
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/seed`, {
    method: "POST",
    headers: authHeaders,
  })

  return parseApiResponse<unknown>(response)
}

async function setImmutable<T>(path: string, fields: IImmutablePayload) {
  const authHeaders = await getAuthHeaders()
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
    method: "PATCH",
    body: JSON.stringify(fields),
    headers: {
      ...Headers.jsonBody,
      ...authHeaders,
    },
  })

  return parseApiResponse<T>(response)
}

async function sendJson<T>(path: string, method: string, fields?: unknown) {
  const authHeaders = await getAuthHeaders()
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
    method,
    body: fields ? JSON.stringify(fields) : undefined,
    headers: fields
      ? {
          ...Headers.jsonBody,
          ...authHeaders,
        }
      : authHeaders,
  })

  return parseApiResponse<T>(response)
}

export async function updateAdminDiplomaAction(
  id: string,
  fields: IAdminDiplomaPayload
) {
  return sendJson<IDiploma>(`/diplomas/${id}`, "PUT", fields)
}

export async function deleteAdminDiplomaAction(id: string) {
  return sendJson<null>(`/diplomas/${id}`, "DELETE")
}

export async function updateAdminExamAction(
  id: string,
  fields: IAdminExamPayload
) {
  return sendJson<IExam>(`/exams/${id}`, "PUT", fields)
}

export async function deleteAdminExamAction(id: string) {
  return sendJson<null>(`/exams/${id}`, "DELETE")
}

export async function createAdminQuestionAction(
  fields: ICreateQuestionWithExamPayload
) {
  return sendJson<IQuestion>("/questions", "POST", fields)
}

export async function updateAdminQuestionAction(
  id: string,
  fields: IUpdateQuestionPayload
) {
  return sendJson<IQuestion>(`/questions/${id}`, "PUT", fields)
}

export async function deleteAdminQuestionAction(id: string) {
  return sendJson<null>(`/questions/${id}`, "DELETE")
}

export async function setAdminDiplomaImmutableAction(
  id: string,
  immutable: boolean
) {
  return setImmutable<IDiploma>(`/admin/diplomas/${id}/immutable`, {
    immutable,
  })
}

export async function setAdminExamImmutableAction(id: string, immutable: boolean) {
  return setImmutable<IExam>(`/admin/exams/${id}/immutable`, { immutable })
}

export async function setAdminQuestionImmutableAction(
  id: string,
  immutable: boolean
) {
  return setImmutable<IQuestion>(`/admin/questions/${id}/immutable`, {
    immutable,
  })
}

export async function setAdminUserImmutableAction(id: string, immutable: boolean) {
  return setImmutable<IAdminUser>(`/admin/users/${id}/immutable`, {
    immutable,
  })
}
