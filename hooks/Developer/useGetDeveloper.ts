import { developerApi } from '@/apis/Developer'
import { isPending } from '@reduxjs/toolkit'
import { useMutation } from '@tanstack/react-query'
import React from 'react'

const useGetDeveloper = () => {
    const mutation = useMutation({
        mutationFn: (id: string) => {
            return developerApi.developerGet(id);
        }
    })
    return {
        mutate: mutation.mutate,
        isPending: mutation.isPending,
        data: mutation.data,
        error: mutation.error
    }
}

export default useGetDeveloper