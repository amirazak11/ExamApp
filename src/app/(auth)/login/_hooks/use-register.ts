"use client";

import { signupAction } from "@/features/auth/api/auth/auth.api";
import { IRegisterFields } from "@/lib/types/auth";
import { useMutation } from "@tanstack/react-query";

export default function useRegister() {
  const { isPending, error, mutate } = useMutation({
mutationFn: (data: IRegisterFields) => signupAction(data),
    onSuccess: () => {},
    onError: () => {},
  });

  return {
    isPending,
    error,
    register: mutate,
  };
}