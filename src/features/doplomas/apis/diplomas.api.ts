import { IApiResponse } from "@/lib/types/api";
import { IDiploma, IDiplomasResponse } from "@/lib/types/IDiploma";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getExam(id: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/diplomas/${id}`
  );

  const data: IApiResponse<IDiploma> = await response.json().catch(() => {
    throw new Error("Failed to parse server response");
  });

  if (data.status === true) {
    return data.payload;
  }

  return data;
}

export async function getDiplomasAction(page = 1, limit = 10) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/diplomas?page=${page}&limit=${limit}`,
    { cache: "no-store" }
  );

  const data: IDiplomasResponse = await response.json().catch(() => {
    throw new Error("Failed to parse server response");
  });

  if (data.status !== true) {
    throw new Error("Failed to fetch diplomas");
  }

  return data.payload?.data ?? [];
}

export async function getDiplomaByIdAction(id: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/diplomas/${id}`, {
    cache: "no-store",
  });

  const data: IApiResponse<IDiploma> = await response.json().catch(() => {
    throw new Error("Failed to parse server response");
  });

  if (data.status !== true) {
    throw new Error(data.message || "Failed to fetch diploma");
  }

  return data.payload ?? null;
}
