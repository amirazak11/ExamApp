'use client';

import { IApiResponse, IPaginatedResponse } from "@/lib/types/api";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { PAGINATION_LIMIT } from "@/components/constants/api.constants";
import { IExam } from "@/lib/types/comment";

export default function useExamList(diplomaId: string) {
  const searchParams = useSearchParams();
  const limit = Number(searchParams.get('limit') || PAGINATION_LIMIT);

  return useInfiniteQuery({
    queryKey: ["exams", diplomaId, limit],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const response = await fetch(`/api/exams?diplomaId=${diplomaId}&page=${pageParam}&limit=${limit}`);

      if (!response.ok) {
        throw new Error("Failed to fetch exams");
      }

      const data: IApiResponse<IPaginatedResponse<IExam>> = await response.json();

      if (!data.status) {
        throw new Error(data.message);
      }

      return data.payload;
    },
        enabled: !!diplomaId,
       getNextPageParam: (lastPage) => {
      if (!lastPage) return undefined;

      if (lastPage.metadata.page === lastPage.metadata.totalPages) {
        return undefined;
      }

      return lastPage.metadata.page + 1;
    },
  });
}