// "use client";

// import { toast } from "sonner";
// import { useMutation } from "@tanstack/react-query";
// import { forgetpassword } from "@/features/auth/api/forgetpassword/forgetpassword.api";

// export default function useForgetpassword() {
//   const { isPending, error, mutate } = useMutation({
//     mutationFn: forgetpassword,

//     onError: (error) => {
//       toast.error(error.message);
//     },
//   });

//   return {
//     isPending,
//     error,
//     sendForgetPassword: mutate,
//   };
// }