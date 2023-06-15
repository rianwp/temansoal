"use client"

import { SessionProvider } from "next-auth/react"
import { RecoilRoot } from "recoil"

interface ProviderProps {
  children: React.ReactNode
}

const Provider = ({children}: ProviderProps) => {
  return (
    <RecoilRoot>
      <SessionProvider>
        {children}
      </SessionProvider>
    </RecoilRoot>
  )
}

export default Provider
