import { useMutation } from '@tanstack/react-query';
import { Login } from '@/apis/Login';

type VerifyOtpPayload = {
  mobileno: string;
  otp: string;
};

export const useVerifyOtp = () => {
  const mutation = useMutation({
    mutationFn: async (payload: VerifyOtpPayload) => {
      const { data } = await Login.verifyOtp(payload);
      return data;
    },
  });

  return {
    verify: mutation.mutate,
    isPending: mutation.isPending,
    error: mutation.error,
    data: mutation.data,
  };
};
