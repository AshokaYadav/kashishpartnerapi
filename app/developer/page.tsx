'use client'
import useGetDeveloper from '@/hooks/Developer/useGetDeveloper'
import { RootState } from '@/store/store';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const page = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const {mutate,data,error,isPending}=useGetDeveloper()

  console.log(data?.data);
  useEffect(()=>{
    user && mutate(user?.id);
  },[]);
  if(isPending){
    return <h1>Loading</h1>
  }
  return (
    <div className='flex justify-end'>
      <button className='bg-blue-500 p-2 rounded-xl'>Create api</button>
    </div>
  )
}

export default page