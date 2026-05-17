'use client';
import { signupAction } from '@/lib/api/auth/auth.api';
import { useMutation } from '@tanstack/react-query';

export default function useRegister() {
  const { isPending, error, mutate } = useMutation({
    mutationFn: signupAction,
    onSuccess: async (finalData) => {
      console.log(finalData);
    },
    onError: (error) => {
      console.error(error);
    },
  })

  return { isPending, error, register: mutate }
}
