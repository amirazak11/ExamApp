// import 'client-only';

import { updateProfileAction } from '@/features/auth/api/auth/user.api';
import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

export default function useUpdateProfile() {
  const { update } = useSession();
  const { isPending, error, mutate } = useMutation({
    mutationFn: updateProfileAction,
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
    updateProfile: mutate,
  };
}
