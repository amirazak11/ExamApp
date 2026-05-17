"use client";

import { sendOtp } from "@/features/auth/api/auth/auth.api";
import { useMutation } from "@tanstack/react-query";

export default function useOtp() {
  const { isPending, error, mutate } = useMutation({
    mutationFn: sendOtp,
    onSuccess: (data) => {
      console.log("hook success:", data);
    },
    onError: (error) => {
      
      console.error(error);
    },
  });

  return { isPending, error, sendOtp: mutate };
}