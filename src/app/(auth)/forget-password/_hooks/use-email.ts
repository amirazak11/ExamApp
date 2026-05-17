"use client";
import { toast } from "sonner"
import { useMutation } from "@tanstack/react-query";
import { createAccount } from "@/features/auth/api/auth/auth.api";

export default function useEmail() {
  const { isPending, error, mutate } = useMutation({
    mutationFn: createAccount,
    onSuccess: (data) => {
      console.log("hook success:", data);
    },
    onError: (error) => {
                toast.error(error.message)
    },
  });

  return { isPending, error, createEmail: mutate };
}