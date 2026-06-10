'use server';

import { IApiResponse } from "@/lib/types/api";
import { CreateEmailPayload, IOtp, IRegisterFields } from "@/lib/types/auth";
import { IConfirmOtp } from "../../types/user";

const BASE = process.env.NEXT_PUBLIC_API_URL;

export async function ChangeEmailAction(fields: CreateEmailPayload) {
  const response = await fetch(`${BASE}/auth/send-email-verification`, {
    method: 'POST',
    body: JSON.stringify(fields),
    headers: { 'Content-Type': 'application/json' },
  });

  const payload: IApiResponse<IRegisterFields> = await response.json().catch(() => {
    throw new Error("Failed to parse server response");
  });

  if (payload.status !== true) {
    throw new Error(payload.message);
  }

  return payload;
}

export async function confirmOtp(fields: IConfirmOtp) {
  const response = await fetch(`${BASE}/users/email/confirm`, {
    method: 'POST',
    body: JSON.stringify(fields),
    headers: { 'Content-Type': 'application/json' },
  });

  const payload: IApiResponse<IOtp> = await response.json().catch(() => {
    throw new Error("Failed to parse server response");
  });

  if (payload.status !== true) {
    throw new Error(payload.message);
  }

  return payload;
}
