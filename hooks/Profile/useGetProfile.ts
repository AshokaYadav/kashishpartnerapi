import { Profile } from '@/apis/Profile'
import { useMutation } from '@tanstack/react-query'
import React from 'react'

export const useGetProfile = () => {
    const mutation=useMutation({
        mutationFn:async(payload:string)=>{
           const {data}= await Profile.getProfileData(payload)
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

export default useGetProfile;

