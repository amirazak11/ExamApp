import { headers } from "next/headers";
import type { IApiResponse, IPaginatedResponse } from "@/lib/types/api";
import type { IExam } from "@/lib/types/comment";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getQuestions(id: string) {
  const headersList = await headers();
  const cookie = headersList.get("cookie") ?? "";

  const response = await fetch(
  `${process.env.NEXTAUTH_URL}/api/exams/${id}`,
    {
      headers: {
        cookie,
      },
      cache: "no-store",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message ?? "Failed to fetch questions");
  }

  return data.payload;
}

export async function getAdminExamsAction(page = 1, limit = 10) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/exams?page=${page}&limit=${limit}`, {
    cache: "no-store",
  });

  const data: IApiResponse<IPaginatedResponse<IExam>> = await response
    .json()
    .catch(() => {
      throw new Error("Failed to parse server response");
    });

  if (data.status !== true) {
    throw new Error(data.message || "Failed to fetch exams");
  }

  return {
    exams: data.payload?.data ?? [],
    total: data.payload?.metadata?.total ?? 0,
  };
}

export async function getExamByIdAction(id: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/exams/${id}`, {
    cache: "no-store",
  });

  const data: IApiResponse<IExam> = await response.json().catch(() => {
    throw new Error("Failed to parse server response");
  });

  if (data.status !== true) {
    throw new Error(data.message || "Failed to fetch exam");
  }

  return data.payload ?? null;
}
