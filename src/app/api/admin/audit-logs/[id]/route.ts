import { proxyJsonRequest } from "@/lib/api/proxy"
import { type NextRequest } from "next/server"

export async function GET(
  request: NextRequest,
  context: RouteContext<"/api/admin/audit-logs/[id]">
) {
  const { id } = await context.params

  return proxyJsonRequest(request, `/admin/audit-logs/${id}`)
}

export async function DELETE(
  request: NextRequest,
  context: RouteContext<"/api/admin/audit-logs/[id]">
) {
  const { id } = await context.params

  return proxyJsonRequest(request, `/admin/audit-logs/${id}`, {
    method: "DELETE",
  })
}
