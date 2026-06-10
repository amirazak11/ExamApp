"use client ";

import { IApiResponse } from "@/lib/types/api";
import { ForgetPasswordPayload, IRegisterFields, ResetPasswordPayload } from "@/lib/types/auth";

const BASE = process.env.NEXT_PUBLIC_API_URL;

export async function forgetpassword(fields: ForgetPasswordPayload) {
  const response = await fetch(`${BASE}/auth/forgot-password`, {
    method: "POST",
    body: JSON.stringify(fields),
    headers: { "Content-Type": "application/json" },
  });

  const payload: IApiResponse<IRegisterFields> = await response.json().catch(() => {
    throw new Error("Failed to parse server response");
  });

  if (!response.ok || payload.status !== true) {
    throw new Error(payload.message || "Failed to send reset email");
  }

  return payload;
}

export async function resetpassword(fields: ResetPasswordPayload) {
  const response = await fetch(`${BASE}/auth/reset-password`, {
    method: "POST",
    body: JSON.stringify(fields),
    headers: { "Content-Type": "application/json" },
  });

  const payload: IApiResponse<IRegisterFields> = await response.json().catch(() => {
    throw new Error("Failed to parse server response");
  });

  if (!response.ok || payload.status !== true) {
    throw new Error(payload.message || "Failed to reset password");
  }

  return payload;
}
