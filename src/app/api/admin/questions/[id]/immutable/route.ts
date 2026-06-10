import { Headers } from "@/components/constants/api.constants"
import { getJsonBody, proxyJsonRequest } from "@/lib/api/proxy"
import { type NextRequest } from "next/server"

export async function PATCH(
  request: NextRequest,
  context: RouteContext<"/api/admin/questions/[id]/immutable">
) {
  const { id } = await context.params
  const body = await getJsonBody(request)

  return proxyJsonRequest(request, `/admin/questions/${id}/immutable`, {
    method: "PATCH",
    headers: Headers.jsonBody,
    body: JSON.stringify(body),
  })
}
