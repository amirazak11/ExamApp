'use server';

// import 'server-only';


import { IApiResponse } from "@/lib/types/api";
import { updateTag } from "next/cache";
import { getNextAuthToken } from "../util/auth.util";
import { ResetPasswordPayload } from "@/lib/types/auth";

export async function ChangepasswordAction(fields: ResetPasswordPayload) {
  const jwt = await getNextAuthToken();
  const token = jwt?.token;
  const response = await fetch('https://exam-app.elevate-bootcamp.cloud/api/users/change-password', {
    method: 'PATCH',
    body: JSON.stringify(fields),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })

  const payload: IApiResponse<ResetPasswordPayload> = await response.json();

  if (payload.status !== true) {
    throw new Error(payload.message);
  }
  updateTag('user')

  return payload;
}