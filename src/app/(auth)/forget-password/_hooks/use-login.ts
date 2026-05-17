'use client';
import { loginAction } from '@/features/auth/api/auth/auth.api';
import { useMutation } from '@tanstack/react-query';

export default function useLogin() {
  const { isPending, error, mutate } = useMutation({
    mutationFn: loginAction,
    onSuccess: async (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error(error);
    },
  })

  return { isPending, error, login: mutate }
}
