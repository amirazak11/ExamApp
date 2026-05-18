import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { Headers } from "@/components/constants/api.constants";

export async function GET(request: NextRequest) {
  const token = await getToken({ req: request });

  if (!token?.token) {
    return NextResponse.json(
      {
        status: false,
        code: 401,
        message: "No token provided",
      },
      { status: 401 }
    );
  }

  const searchParams = request.nextUrl.searchParams;

  const diplomaId = searchParams.get("diplomaId");
  const page = searchParams.get("page") ?? "1";
  const limit = searchParams.get("limit") ?? "6";

  if (!diplomaId) {
    return NextResponse.json(
      {
        status: false,
        code: 400,
        message: "diplomaId is required",
      },
      { status: 400 }
    );
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/exams?diplomaId=${diplomaId}&page=${page}&limit=${limit}`,
    {
      headers: Headers.authorization(token.token as string),
      cache: "no-store",
    }
  );

  const data = await response.json();

  return NextResponse.json(data, { status: response.status });
}