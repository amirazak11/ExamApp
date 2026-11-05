"use client";

import { IUpdateProfileFields } from "@/features/auth/types/user";
import { updateProfileAction } from "@/features/setting/api/auth/user.api";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

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

    onError: () => {},
  });

  return {
    isPending,
    error,
    updateProfile: mutate,
  };
}