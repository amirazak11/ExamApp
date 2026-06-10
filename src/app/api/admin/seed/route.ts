import { proxyJsonRequest } from "@/lib/api/proxy"
import { type NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  return proxyJsonRequest(request, "/admin/seed", {
    method: "POST",
  })
}
