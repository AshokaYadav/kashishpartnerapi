import { useMutation } from '@tanstack/react-query';
import { Login } from '@/apis/Login';

type SendOtpPayload = {
  mobileno: string;
};

export const useSendLoginOtp = () => {
  const mutation = useMutation({
    mutationFn: async (payload: SendOtpPayload) => {
      const { data } = await Login.sendLoginOtp(payload);
      return data;  
    },
  });

  return {
    mutate: mutation.mutate,        // sendOtp
    isPending: mutation.isPending,  // use this instead of isLoading
    data: mutation.data,
    error: mutation.error,
  };
};
