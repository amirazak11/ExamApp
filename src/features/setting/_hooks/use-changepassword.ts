// import 'client-only';

import { ChangepasswordAction } from '@/features/auth/api/auth/changepassword.api';
import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

export default function useChangePassword() {
  const { update } = useSession();
  const { isPending, error, mutate } = useMutation({
    mutationFn: ChangepasswordAction,
    onSuccess: (data) => {
      console.log(data);
      update({
        user: {
          ...data.payload,
          firstName: 'Test'
        }
      })
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return {
    isPending,
    error,
    Changepassword: mutate,
  };
}
