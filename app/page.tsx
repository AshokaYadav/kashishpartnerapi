'use client'
import { RootState } from '@/store/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const page = () => {
  const router=useRouter();
  
   const isAuthenticated = useSelector((state:RootState) => state.auth.isAuthenticated);
   console.log(isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/Login');
    }
  }, [isAuthenticated]);
  return (
    <div>page</div>
  )
}

export default page