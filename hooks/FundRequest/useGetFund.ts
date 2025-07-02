import { fundRequest } from "@/apis/fundRequest";
import { isPending } from "@reduxjs/toolkit";
import { useMutation } from "@tanstack/react-query";



import React from 'react'

const useGetFund = () => {
    const mutation = useMutation({
        mutationFn: async(payload: string) => {
            const data = fundRequest.getFundRequest(payload);
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

export default useGetFund