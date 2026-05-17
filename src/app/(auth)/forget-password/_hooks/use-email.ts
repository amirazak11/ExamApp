"use client";
import { toast } from "sonner"
import { createAccount } from "@/lib/api/auth/auth.api";
import { useMutation } from "@tanstack/react-query";

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