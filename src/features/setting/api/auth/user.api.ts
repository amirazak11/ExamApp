"use server";

import { IApiResponse } from "@/lib/types/api";
import { IUpdateProfileFields } from "../../types/user";
import { getNextAuthToken } from "@/features/auth/api/util/auth.util";
import { User } from "@/features/auth/types/user";

export async function updateProfileAction(fields: IUpdateProfileFields) {
  const jwt = await getNextAuthToken();
  const token = jwt?.token;

  if (!token) {
    throw new Error("Unauthorized: No token found");
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/profile`,
    {
      method: "PATCH",
      body: JSON.stringify(fields),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  const payload: IApiResponse<User> = await response.json().catch(() => {
    throw new Error("Failed to parse server response");
  });

  if (!response.ok || payload.status !== true) {
    throw new Error(payload.message || "Failed to update profile");
  }

  return payload;
}
