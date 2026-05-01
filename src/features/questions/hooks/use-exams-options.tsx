import { PAGINATION_LIMIT } from "@/components/constants/api.constants";
export const EXAMS_KEYS = {
  list: (page: number = 1, limit: number = PAGINATION_LIMIT , diplomaId : number) => ['diploma-list', page, limit , diplomaId] as const,
} as const