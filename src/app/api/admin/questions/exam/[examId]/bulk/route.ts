import { Headers } from "@/components/constants/api.constants"
import { getJsonBody, proxyJsonRequest } from "@/lib/api/proxy"
import { type NextRequest } from "next/server"

export async function POST(
  request: NextRequest,
  context: RouteContext<"/api/admin/questions/exam/[examId]/bulk">
) {
  const { examId } = await context.params
  const body = await getJsonBody(request)

  return proxyJsonRequest(request, `/questions/exam/${examId}/bulk`, {
    method: "POST",
    headers: Headers.jsonBody,
    body: JSON.stringify(body),
  })
}
