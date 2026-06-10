import { Headers } from "@/components/constants/api.constants"
import { getToken } from "next-auth/jwt"
import { type NextRequest, NextResponse } from "next/server"

export async function getProxyAuthHeaders(request: NextRequest) {
  const token = await getToken({ req: request })

  if (!token?.token) {
    return null
  }

  return Headers.authorization(token.token as string)
}

export async function proxyJsonRequest(
  request: NextRequest,
  path: string,
  init: RequestInit = {}
) {
  const authHeaders = await getProxyAuthHeaders(request)

  if (!authHeaders) {
    return NextResponse.json(
      {
        status: false,
        code: 401,
        message: "No token provided",
      },
      { status: 401 }
    )
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
    ...init,
    headers: {
      ...authHeaders,
      ...init.headers,
    },
    cache: "no-store",
  })

  let payload: unknown

  try {
    payload = await response.json()
  } catch {
    payload = {
      status: false,
      code: response.status,
      message: "Failed to parse server response",
    }
  }

  return NextResponse.json(payload, { status: response.status })
}

export async function getJsonBody(request: NextRequest) {
  try {
    return await request.json()
  } catch {
    return undefined
  }
}
