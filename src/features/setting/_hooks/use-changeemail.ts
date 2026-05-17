"use client";
import { toast } from "sonner"
import { useMutation } from "@tanstack/react-query";
import { ChangeEmailAction } from "../api/auth/change-email.api";

export default function useChangeEmail() {
  const { isPending, error, mutate } = useMutation({
    mutationFn: ChangeEmailAction,
    onSuccess: (data) => {
      console.log("hook success:", data);
    },
    onError: (error) => {
                toast.error(error.message)
    },
  });

  return { isPending, error, changeEmail: mutate };
}