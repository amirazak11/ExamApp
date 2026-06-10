

"use server"
import { Headers } from "@/components/constants/api.constants";
import { IApiResponse } from "@/lib/types/api";
import { CreateEmailPayload, ILoginFields, IOtp, IRegisterFields } from "@/lib/types/auth";
import { ILoginResponse } from "@/lib/types/auth";

export async function loginAction(fields: ILoginFields) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    method: 'POST',
    body: JSON.stringify(fields),
    headers: {
...Headers.jsonBody
    },
  })

  const payload: IApiResponse<ILoginResponse> = await response.json();

return payload;

}
export async function createAccount(fields: CreateEmailPayload) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/send-email-verification`, {
    method: 'POST',
    body: JSON.stringify(fields),
    headers: Headers.jsonBody,
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const payload: IApiResponse<IRegisterFields> = await response.json();

  if (payload.status !== true) {
    throw new Error(payload.message || 'Failed to create account');
  }

return payload;
}
export async function sendOtp(fields: IOtp) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/confirm-email-verification`, {
    method: 'POST',
    body: JSON.stringify(fields),
    headers: Headers.jsonBody,
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const payload: IApiResponse<IOtp> = await response.json();

  if (payload.status !== true) {
    throw new Error(payload.message || 'Failed to verify OTP');
  }

return payload;
}


export async function signupAction(fields: IRegisterFields) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
    {
      method: "POST",
      headers: Headers.jsonBody,
      body: JSON.stringify(fields),
    }
  );

  const payload = await response.json();

  if (!response.ok || payload.status !== true) {
    throw new Error(payload.message || "Registration failed");
  }

  return payload;
}