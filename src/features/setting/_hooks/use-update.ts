"use client";

import { IUpdateProfileFields } from "@/features/auth/types/user";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { updateProfileAction } from "../api/auth/user.api";

export default function useUpdateProfile() {
  const { data: session, update } = useSession();

  const { isPending, error, mutate } = useMutation({
    mutationFn: (fields: IUpdateProfileFields) => updateProfileAction(fields),

    onSuccess: async (data) => {
      await update({
        user: {
          ...data.payload,
        },
      });
    },

    onError: (error) => {
      console.error(error);
    },
  });

  return {
    isPending,
    error,
    updateProfile: mutate,
  };
}