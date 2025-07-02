import { DepositDetails, fundRequest } from '@/apis/fundRequest'
import { isPending } from '@reduxjs/toolkit'
import { useMutation } from '@tanstack/react-query'
import React from 'react'

const usePostFund = () => {
    const mutation=useMutation({
        mutationFn:async (payload:DepositDetails)=>{
            const data=fundRequest.postFundRequest(payload);
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

export default usePostFund