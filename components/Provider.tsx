"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { SessionProvider } from "next-auth/react"
import { RecoilRoot } from "recoil"

interface ProviderProps {
  children: React.ReactNode
}

const queryClient = new QueryClient()

const Provider = ({children}: ProviderProps) => {
  return (
    <RecoilRoot>
      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </SessionProvider>
    </RecoilRoot>
  )
}

export default Provider
