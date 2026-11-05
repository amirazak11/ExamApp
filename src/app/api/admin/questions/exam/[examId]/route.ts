import { proxyJsonRequest } from "@/lib/api/proxy"
import { type NextRequest } from "next/server"

export async function GET(
  request: NextRequest,
  context: RouteContext<"/api/admin/questions/exam/[examId]">
) {
  const { examId } = await context.params

  const query = request.nextUrl.searchParams.toString()
  const suffix = query ? `?${query}` : ""

  return proxyJsonRequest(request, `/questions/exam/${examId}${suffix}`)
}
