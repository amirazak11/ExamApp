"use client";

import { loginSchema } from "@/features/auth/schema/login-schema";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { z } from "zod";

type LoginData = z.infer<typeof loginSchema>;

export default function useLogin() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (data: LoginData) => {
    setIsPending(true);
    setError(null);

    try {
      const result = await signIn("credentials", {
        username: data.username,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
        return;
      }

      if (result?.ok) {
        const callbackUrl =
          new URLSearchParams(window.location.search).get("callbackUrl") || "/";

        window.location.href = callbackUrl;
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsPending(false);
    }
  };

  return { isPending, error, login };
}