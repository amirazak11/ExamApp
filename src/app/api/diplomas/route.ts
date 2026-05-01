import { Headers } from "@/components/constants/api.constants";
import { IErrorResponse } from "@/lib/types/api";
import { IDiplomasResponse } from "@/lib/types/IDiploma";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = await getToken({ req });

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

  const searchParams = req.nextUrl.searchParams;
  const page = searchParams.get("page") ?? "1";
  const limit = searchParams.get("limit") ?? "6";

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/diplomas?page=${page}&limit=${limit}`,
    {
      headers: {
        ...Headers.authorization(token.token as string),
      },
    }
  );

  const payload: IDiplomasResponse = await response.json();

  return NextResponse.json(payload, { status: response.status });
}