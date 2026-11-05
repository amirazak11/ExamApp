'use client';

import { ChangepasswordAction } from '@/features/auth/api/auth/changepassword.api';
import { useMutation } from '@tanstack/react-query';
import { signOut } from 'next-auth/react';
import { toast } from 'sonner';

interface ChangePasswordFields {
  currentPassword: string;
  password: string;
  confirmPassword: string;
}

export default function useChangePassword() {
  const { isPending, error, mutate } = useMutation({
    mutationFn: ({ currentPassword, password, confirmPassword }: ChangePasswordFields) =>
      ChangepasswordAction({ currentPassword, newPassword: password, confirmPassword }),
    onSuccess: (data) => {
      toast.success(data.message || 'Password changed successfully');
      signOut({ callbackUrl: '/login' });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Something went wrong');
    },
  });

  return {
    isPending,
    error,
    Changepassword: mutate,
  };
}
