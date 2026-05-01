import { Headers } from "@/components/constants/api.constants";
import { IErrorResponse } from "@/lib/types/api";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: RouteContext<"/api/exams/[id]">
) {
  const { id } = await context.params;

  const token = await getToken({ req: request });

  if (!token?.token) {
    return NextResponse.json(
      {
        status: false,
        code: 401,
        message: "Invalid or expired token.",
      } as IErrorResponse,
      { status: 401 }
    );
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/questions/exam/${id}`,
    {
      headers: {
        ...Headers.authorization(token.token as string),
      },
      cache: "no-store",
    }
  );

  const payload = await response.json();

  return NextResponse.json(payload, { status: response.status });
}