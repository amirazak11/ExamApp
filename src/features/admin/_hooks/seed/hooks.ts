"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { runAdminSeed } from "../../apis/admin.fetch"
import { adminQueryKeys } from "../shared"

export function useRunAdminSeed() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: runAdminSeed,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminQueryKeys.all })
      queryClient.invalidateQueries({ queryKey: ["diplomas"] })
      queryClient.invalidateQueries({ queryKey: ["exams"] })
    },
  })
}
