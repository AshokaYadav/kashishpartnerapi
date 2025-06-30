// src/app/client-layout.tsx
'use client'

import { Provider, useDispatch, useSelector } from 'react-redux'
import { RootState, store } from '@/store/store'
import { hydrate } from '@/store/features/auth/authSlice'
import { useEffect } from 'react'
import QueryProvider from '@/providers/query-provider'
// import { hydrate } from '@/store/features/auth/authSlice'
// import { hydrate } from '@/store/features/auth/authSlice'
// import { useRouter } from 'next/navigation'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {

  useEffect(() => {
    store.dispatch(hydrate())
  }, [])


  return (
    <Provider store={store}>
      <QueryProvider>
        {children}
      </QueryProvider>
    </Provider>
  )
}