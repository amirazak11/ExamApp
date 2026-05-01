"use client ";

import { IApiResponse } from "@/lib/types/api";
import { ForgetPasswordPayload, IRegisterFields, ResetPasswordPayload } from "@/lib/types/auth";
export async function forgetpassword(fields: ForgetPasswordPayload) {
  const response = await fetch(
    "https://exam-app.elevate-bootcamp.cloud/api/auth/forgot-password",
    {
      method: "POST",
      body: JSON.stringify(fields),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const payload: IApiResponse<IRegisterFields> = await response.json();

  if (!response.ok || payload.status !== true) {
    throw new Error(payload.message || "Failed to send reset email");
  }

  return payload;
}

export async function resetpassword(fields: ResetPasswordPayload) {

  const response = await fetch(
    "https://exam-app.elevate-bootcamp.cloud/api/auth/reset-password",
    {
      method: "POST",
      body: JSON.stringify(fields),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const payload: IApiResponse<IRegisterFields> = await response.json();

  if (!response.ok || payload.status !== true) {
    throw new Error(payload.message || "Failed to send reset email");
  }

  return payload;
}