import { Headers } from "@/components/constants/api.constants"
import { getJsonBody, proxyJsonRequest } from "@/lib/api/proxy"
import { type NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.toString()
  const suffix = query ? `?${query}` : ""

  return proxyJsonRequest(request, `/diplomas${suffix}`)
}

export async function POST(request: NextRequest) {
  const body = await getJsonBody(request)

  return proxyJsonRequest(request, "/diplomas", {
    method: "POST",
    headers: Headers.jsonBody,
    body: JSON.stringify(body),
  })
}
