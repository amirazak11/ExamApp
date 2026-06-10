import { Headers } from "@/components/constants/api.constants"
import { getJsonBody, proxyJsonRequest } from "@/lib/api/proxy"
import { type NextRequest } from "next/server"

export async function GET(
  request: NextRequest,
  context: RouteContext<"/api/admin/questions/[id]">
) {
  const { id } = await context.params

  return proxyJsonRequest(request, `/questions/${id}`)
}

export async function PUT(
  request: NextRequest,
  context: RouteContext<"/api/admin/questions/[id]">
) {
  const { id } = await context.params
  const body = await getJsonBody(request)

  return proxyJsonRequest(request, `/questions/${id}`, {
    method: "PUT",
    headers: Headers.jsonBody,
    body: JSON.stringify(body),
  })
}

export async function DELETE(
  request: NextRequest,
  context: RouteContext<"/api/admin/questions/[id]">
) {
  const { id } = await context.params

  return proxyJsonRequest(request, `/questions/${id}`, {
    method: "DELETE",
  })
}
