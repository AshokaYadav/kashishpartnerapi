import { Login } from '@/apis/Login';
import { useMutation } from '@tanstack/react-query'
import React from 'react';

type PersonalDetail = {
  mobileno: string,
  email: string, // <- email ka type usually string hota hai
  name: string,
  token: string
}

const useSendPersonalDetail = () => {
    const mutation=useMutation({
        mutationFn:async(payload:PersonalDetail)=>{
            const {data}=await Login.submitPersonalDetail(payload);
            return data;
        }
    })
  return {
    sendPersonDetail:mutation.mutate,
    isPending:mutation.isPending,
    data:mutation.data,
    error:mutation.error
  }
}

export default useSendPersonalDetail