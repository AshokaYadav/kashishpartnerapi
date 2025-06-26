import { Login } from '@/apis/Login';
import { useMutation } from '@tanstack/react-query'
import React from 'react'

type SendOtpPayload = {
  mobileno: string;
};

const useSendRegisterOtp = () => {
  const mutation=useMutation({
    mutationFn:async (payload:SendOtpPayload)=>{
     const {data}= await Login.sendRegisterOtp(payload);
     return data;
    }
  })
  return {
    mutate:mutation.mutate,
    isPending:mutation.isPending,
    data:mutation.data,
    error:mutation.error
  }
}

export default useSendRegisterOtp