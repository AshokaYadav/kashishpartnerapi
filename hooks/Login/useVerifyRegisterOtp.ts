import { useMutation } from '@tanstack/react-query';
import { Login } from '@/apis/Login';

type VerifyOtpPayload = {
  mobileno: string;
  otp: string;
};

export const useVerifyRegisterOtp = () => {
  const mutation = useMutation({
    mutationFn: async (payload: VerifyOtpPayload) => {
      const { data } = await Login.verifyRegisterOtp(payload)
      return data;
    },
  });

  return {
    registerVerify: mutation.mutate,
    isPending: mutation.isPending,
    error: mutation.error,
    data: mutation.data,
  };
};
