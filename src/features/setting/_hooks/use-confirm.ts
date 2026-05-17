"use client";
import { useMutation } from "@tanstack/react-query";
import { confirmOtp } from "../api/auth/change-email.api";

export default function useConfirm() {
  const { isPending, error, mutate } = useMutation({
    mutationFn: confirmOtp,
    onSuccess: (data) => {
      console.log("hook success:", data);
    },
    onError: (error) => {
      
      console.error(error);
    },
  });

  return { isPending, error, confirmOtp: mutate };
}