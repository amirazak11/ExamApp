"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
  createAdminQuestion,
  createBulkAdminQuestions,
  deleteAdminQuestion,
  fetchAdminQuestion,
  fetchAdminQuestionsByExam,
  setAdminImmutable,
  updateAdminQuestion,
} from "../../apis/admin.fetch"
import type {
  IBulkQuestionsPayload,
  ICreateQuestionWithExamPayload,
  IUpdateQuestionPayload,
} from "@/features/questions/types/questions"
import { adminQueryKeys, type ImmutableVariables } from "../shared"

export function useAdminQuestionsByExam(examId: string) {
  return useQuery({
    queryKey: adminQueryKeys.questions(examId),
    queryFn: () => fetchAdminQuestionsByExam(examId),
    enabled: !!examId,
  })
}

export function useAdminQuestion(id: string) {
  return useQuery({
    queryKey: adminQueryKeys.question(id),
    queryFn: () => fetchAdminQuestion(id),
    enabled: !!id,
  })
}

export function useCreateAdminQuestion() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (fields: ICreateQuestionWithExamPayload) =>
      createAdminQuestion(fields),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminQueryKeys.all })
      queryClient.invalidateQueries({ queryKey: ["exams"] })
      queryClient.invalidateQueries({ queryKey: ["questions"] })
    },
  })
}

export function useCreateBulkAdminQuestions() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      examId,
      fields,
    }: {
      examId: string
      fields: IBulkQuestionsPayload
    }) => createBulkAdminQuestions(examId, fields),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminQueryKeys.all })
      queryClient.invalidateQueries({ queryKey: ["exams"] })
      queryClient.invalidateQueries({ queryKey: ["questions"] })
    },
  })
}

export function useUpdateAdminQuestion() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      fields,
    }: {
      id: string
      fields: IUpdateQuestionPayload
    }) => updateAdminQuestion(id, fields),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminQueryKeys.all })
      queryClient.invalidateQueries({ queryKey: ["questions"] })
    },
  })
}

export function useDeleteAdminQuestion() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteAdminQuestion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminQueryKeys.all })
      queryClient.invalidateQueries({ queryKey: ["exams"] })
      queryClient.invalidateQueries({ queryKey: ["questions"] })
    },
  })
}

export function useSetAdminQuestionImmutable() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, immutable }: ImmutableVariables) =>
      setAdminImmutable(`/api/admin/questions/${id}/immutable`, { immutable }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminQueryKeys.all })
      queryClient.invalidateQueries({ queryKey: ["questions"] })
    },
  })
}
