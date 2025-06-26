// src/hooks/use-auth.ts
import { axiosInstance } from '@/lib/axios';
// import { logout } from '@/store/features/auth/authSlice';
// import { store } from '@/store/store';
import { UserT } from '@/types/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// import { useRouter } from 'next/navigation';

interface LoginResponse {
  success: boolean;
  message: string;
}

interface LoginRequest {
  email: string;
  password: string;
  latitude: number;
  longitude: number;
}

export interface RetailerLoginRequest {
  token: string;
  latitude: number;
  longitude: number;
}

interface VerifyOtpResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: UserT;
}

export const useInitiateLogin = (email: string, password: string) => {
  return useMutation({
    mutationFn: async ({ email, password, latitude, longitude }: LoginRequest): Promise<LoginResponse> => {
      const { data } = await axiosInstance.post('/auth/login', { email, password, latitude, longitude });
      return data;
    },
  });
}

export const useRetailerInitiateLogin = (token: string, coordinates = '') => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (requestBody: RetailerLoginRequest): Promise<LoginResponse> => {
      const { data } = await axiosInstance.post('/auth/retailor-login', requestBody);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['retailor-login'] });
    },
    onError: () => { },
  });

  return {
    isLoginLoading: mutation.isPending,
    loginData: mutation.data,
    login: mutation.mutateAsync,
    loginError: mutation.error,
  }
  // return useQuery({
  //   queryKey: ['retailerLogin', token],
  //   queryFn: async (): Promise<LoginResponse> => {
  //     const { data } = await axiosInstance.post('/auth/retailor-login', { token });
  //     return data;
  //   },
  //   retry: 1,
  //   staleTime: Infinity, // Don't refetch automatically
  // });
};


export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: async ({
      token,
      otp,
    }: {
      token: string;
      otp: string;
    }): Promise<VerifyOtpResponse> => {
      const { data } = await axiosInstance.post('/auth/verify-otp', { token, otp });
      return data;
    },
  });
}

// export const useLogout = () => {
//   const route = useRouter();

//   return () => {
//       store.dispatch(logout());
//       route.push('/login');
//   }
// }