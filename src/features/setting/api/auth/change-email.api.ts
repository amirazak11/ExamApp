'use server';

import { IApiResponse } from "@/lib/types/api";
import { CreateEmailPayload, IOtp, IRegisterFields } from "@/lib/types/auth";
import { IConfirmOtp } from "../../types/user";

export async function ChangeEmailAction(fields: CreateEmailPayload) {
  const response = await fetch('https://exam-app.elevate-bootcamp.cloud/api/auth/send-email-verification', {
    method: 'POST',
    body: JSON.stringify(fields),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const payload: IApiResponse<IRegisterFields> = await response.json();

  if (payload.status !== true) {
    throw new Error(payload.message);
  }

return payload;
}
export async function confirmOtp(fields: IConfirmOtp
) {
  const response = await fetch('https://exam-app.elevate-bootcamp.cloud/api/users/email/confirm', {
    method: 'POST',
    body: JSON.stringify(fields),
    headers: {
      'Content-Type': 'application/json',
    },
  })
console.log("API response:", response);
  const payload: IApiResponse<IOtp> = await response.json();

  if (payload.status !== true) {
    throw new Error(payload.message);
  }

return payload;
}