

// import 'server-only';
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
export async function sendOtp(fields: IOtp) {
  const response = await fetch('https://exam-app.elevate-bootcamp.cloud/api/auth/confirm-email-verification', {
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


export async function signupAction(fields: IRegisterFields) {
  const response = await fetch('https://exam-app.elevate-bootcamp.cloud/api/auth/register', {
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

