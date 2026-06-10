"use client"

import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseQueryOptions,
} from "@tanstack/react-query"
import {
  fetchAdminUsers,
  setAdminImmutable,
} from "../../apis/admin.fetch"
import {
  adminQueryKeys,
  type ImmutableVariables,
  type PaginationOptions,
} from "../shared"

export function useAdminUsers(
  options: PaginationOptions = {},
  queryOptions?: Omit<
    UseQueryOptions<Awaited<ReturnType<typeof fetchAdminUsers>>, Error>,
    "queryKey" | "queryFn"
  >
) {
  return useQuery({
    queryKey: adminQueryKeys.users(options),
    queryFn: () => fetchAdminUsers(options),
    ...queryOptions,
  })
}

export function useSetAdminUserImmutable() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, immutable }: ImmutableVariables) =>
      setAdminImmutable(`/api/admin/users/${id}/immutable`, { immutable }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminQueryKeys.all })
    },
  })
}
