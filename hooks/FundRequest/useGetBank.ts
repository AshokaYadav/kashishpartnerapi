import { fundRequest } from "@/apis/fundRequest";
import { isPending } from "@reduxjs/toolkit";
import { useMutation } from "@tanstack/react-query";



import React from 'react'

const useGetBank = () => {
    const mutation = useMutation({
        mutationFn: async() => {
            const data = fundRequest.getBankRequest();
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

export default useGetBank;