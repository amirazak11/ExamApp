'use server';

// import 'server-only';


import { IApiResponse } from "@/lib/types/api";
import { updateTag } from "next/cache";
import { getNextAuthToken } from "../util/auth.util";
import { IUpdateProfileFields } from "../../types/user";

export async function updateProfileAction(fields: IUpdateProfileFields) {
  const jwt = await getNextAuthToken();
  const token = jwt?.token;
  const response = await fetch('https://exam-app.elevate-bootcamp.cloud/api/users/profile', {
    method: 'PATCH',
    body: JSON.stringify(fields),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })

  const payload: IApiResponse<IUpdateProfileFields> = await response.json();

  if (payload.status !== true) {
    throw new Error(payload.message);
  }
  updateTag('posts')

  return payload;
}