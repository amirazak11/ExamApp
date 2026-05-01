'use client';

import { IApiResponse, IPaginatedResponse } from "@/lib/types/api";
import { IDiploma } from "@/lib/types/IDiploma";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { PAGINATION_LIMIT } from "@/components/constants/api.constants";

export default function useDiplomaList() {
  const searchParams = useSearchParams();
  const limit = Number(searchParams.get('limit') || PAGINATION_LIMIT);
  return useInfiniteQuery({
    queryKey: ['diplomas', limit],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const response = await fetch(`/api/diplomas?page=${pageParam}&limit=${limit}`);

      if (!response.ok) {
        throw new Error("Failed to fetch diplomas");
      }

      const data: IApiResponse<IPaginatedResponse<IDiploma>> = await response.json();

      if (!data.status) {
        throw new Error(data.message);
      }

      return data.payload;
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage) return undefined;

      if (lastPage.metadata.page === lastPage.metadata.totalPages) {
        return undefined;
      }

      return lastPage.metadata.page + 1;
    },
  });
}