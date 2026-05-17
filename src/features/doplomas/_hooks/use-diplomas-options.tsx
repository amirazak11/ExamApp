import { PAGINATION_LIMIT } from "@/components/constants/api.constants";

export const DIPLOMA_KEYS = {
  list: (page: number = 1, limit: number = PAGINATION_LIMIT) => ['diploma-list', page, limit] as const,
} as const