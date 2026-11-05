"use client";
import { useMutation } from "@tanstack/react-query";
import { confirmOtp } from "../api/auth/change-email.api";

export default function useConfirm() {
  const { isPending, error, mutate } = useMutation({
    mutationFn: confirmOtp,
    onSuccess: () => {},
    onError: () => {},
  });

  return { isPending, error, confirmOtp: mutate };
}