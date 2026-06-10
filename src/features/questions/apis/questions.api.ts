"use server"

import { Headers } from "@/components/constants/api.constants"
import { getNextAuthToken } from "@/features/auth/api/util/auth.util"
import type { IApiResponse, ISuccessResponse } from "@/lib/types/api"
import type {
  ExamQuestionsPayload,
  IBulkQuestionsPayload,
  ICreateQuestionPayload,
  ICreateQuestionWithExamPayload,
  IQuestion,
  IUpdateQuestionPayload,
} from "../types/questions"

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

async function getAuthHeaders() {
  const jwt = await getNextAuthToken()
  const token = jwt?.token

  if (!token) {
    throw new Error("Unauthorized: No token found")
  }

  return Headers.authorization(token as string)
}

async function parseApiResponse<T>(
  response: Response
): Promise<ISuccessResponse<T>> {
  const payload: IApiResponse<T> = await response.json().catch(() => {
    throw new Error("Failed to parse server response")
  })

  if (!response.ok || payload.status !== true) {
    throw new Error(payload.message || "Request failed")
  }

  return payload
}

export async function getQuestionsByExamAction(examId: string) {
  const authHeaders = await getAuthHeaders()

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/questions/exam/${examId}`, {
    headers: authHeaders,
    cache: "no-store",
  })

  const payload = await parseApiResponse<ExamQuestionsPayload>(response)
  return payload.payload?.questions ?? []
}

export async function createQuestionForExamAction(
  examId: string,
  fields: ICreateQuestionPayload
) {
  const authHeaders = await getAuthHeaders()

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/questions/exam/${examId}`, {
    method: "POST",
    body: JSON.stringify(fields),
    headers: {
      ...Headers.jsonBody,
      ...authHeaders,
    },
  })

  return parseApiResponse<IQuestion>(response)
}

export async function createBulkQuestionsForExamAction(
  examId: string,
  fields: IBulkQuestionsPayload
) {
  const authHeaders = await getAuthHeaders()

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/questions/exam/${examId}/bulk`, {
    method: "POST",
    body: JSON.stringify(fields),
    headers: {
      ...Headers.jsonBody,
      ...authHeaders,
    },
  })

  return parseApiResponse<IQuestion[]>(response)
}

export async function getQuestionByIdAction(id: string) {
  const authHeaders = await getAuthHeaders()

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/questions/${id}`, {
    headers: authHeaders,
    cache: "no-store",
  })

  const payload = await parseApiResponse<IQuestion>(response)
  return payload.payload ?? null
}

export async function updateQuestionAction(
  id: string,
  fields: IUpdateQuestionPayload
) {
  const authHeaders = await getAuthHeaders()

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/questions/${id}`, {
    method: "PUT",
    body: JSON.stringify(fields),
    headers: {
      ...Headers.jsonBody,
      ...authHeaders,
    },
  })

  return parseApiResponse<IQuestion>(response)
}

export async function deleteQuestionAction(id: string) {
  const authHeaders = await getAuthHeaders()

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/questions/${id}`, {
    method: "DELETE",
    headers: authHeaders,
  })

  return parseApiResponse<null>(response)
}

export async function createQuestionAction(fields: ICreateQuestionWithExamPayload) {
  const authHeaders = await getAuthHeaders()

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/questions`, {
    method: "POST",
    body: JSON.stringify(fields),
    headers: {
      ...Headers.jsonBody,
      ...authHeaders,
    },
  })

  return parseApiResponse<IQuestion>(response)
}
