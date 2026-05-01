import { headers } from "next/headers";

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