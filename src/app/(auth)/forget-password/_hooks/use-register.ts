'use client';
import { signupAction } from '@/features/auth/api/auth/auth.api';
import { useMutation } from '@tanstack/react-query';

export default function useRegister() {
  const { isPending, error, mutate } = useMutation({
    mutationFn: signupAction,
    onSuccess: () => {},
    onError: () => {},
  })

  return { isPending, error, register: mutate }
}
