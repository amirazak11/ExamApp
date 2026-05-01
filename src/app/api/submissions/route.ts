import { Headers } from "@/components/constants/api.constants";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token?.token) {
    return NextResponse.json(
      {
        status: false,
        code: 401,
        message: "No token provided.",
      },
      { status: 401 }
    );
  }

  const body = await request.json();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/submissions`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...Headers.authorization(token.token as string),
      },
      body: JSON.stringify(body),
    }
  );

  const payload = await response.json();

  return NextResponse.json(payload, { status: response.status });
}