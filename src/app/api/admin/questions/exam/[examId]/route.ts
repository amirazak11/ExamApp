import { proxyJsonRequest } from "@/lib/api/proxy"
import { type NextRequest } from "next/server"

export async function GET(
  request: NextRequest,
  context: RouteContext<"/api/admin/questions/exam/[examId]">
) {
  const { examId } = await context.params

  return proxyJsonRequest(request, `/questions/exam/${examId}`)
}
