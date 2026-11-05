"use client";
import { sendOtp } from "@/features/auth/api/auth/auth.api";
import { useMutation } from "@tanstack/react-query";

export default function useOtp() {
  const { isPending, error, mutate } = useMutation({
    mutationFn: sendOtp,
    onSuccess: () => {},
    onError: () => {},
  });

  return { isPending, error, sendOtp: mutate };
}