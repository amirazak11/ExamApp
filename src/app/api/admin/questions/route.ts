import { Headers } from "@/components/constants/api.constants"
import { getJsonBody, proxyJsonRequest } from "@/lib/api/proxy"
import { type NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  const body = await getJsonBody(request)

  return proxyJsonRequest(request, "/questions", {
    method: "POST",
    headers: Headers.jsonBody,
    body: JSON.stringify(body),
  })
}
