import { proxyJsonRequest } from "@/lib/api/proxy"
import { type NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.toString()
  const suffix = query ? `?${query}` : ""

  return proxyJsonRequest(request, `/admin/audit-logs${suffix}`)
}

export async function DELETE(request: NextRequest) {
  return proxyJsonRequest(request, "/admin/audit-logs", {
    method: "DELETE",
  })
}
