"use client"

import { Loader2 } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { Checkbox } from "../ui/checkbox"
import { toast } from "../ui/use-toast"
import { useRouter } from "next/navigation"

const CredentialsLogin = () => {
  const router = useRouter()
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  
  const buttonClick = async () => {
    setIsLoading(true)
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false
    })
    setIsLoading(false)
    if(res?.error) {
      toast({
        variant: "destructive",
        title: "Login Gagal",
      })
    } else{
      router.push("/")
    }
  }
    
  return (
    <div className="w-full flex flex-col items-center space-y-3">
      <div className="flex flex-col items-start space-y-1.5 w-full">
        <label htmlFor="email" className="text-sm font-medium">Email</label>
        <Input className="w-full" id="email" onChange={(event) => setEmail(event.target.value)} type="email" placeholder="Masukan Email..." />
      </div>
      <div className="flex flex-col items-start space-y-1.5 w-full">
        <label htmlFor="password" className="text-sm font-medium">Password</label>
        <Input className="w-full" id="password" onChange={(event) => setPassword(event.target.value)} type={showPassword ? "text" : "password"} placeholder="Masukan Password..." />
        <div className="flex flex-row space-x-2 pt-1 pb-3">
          <Checkbox id="checbox" onClick={() => setShowPassword(!showPassword)} />
          <label htmlFor="checkbox" className="text-sm">Tampilkan Password</label>
        </div>
      </div>
      <Button disabled={isLoading} size="lg" className="flex flex-row space-x-2 justify-center items-center w-full" onClick={buttonClick}>
        {isLoading ?
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          :
          null
        }
        <p>Login</p>
      </Button>
    </div>
  )
}

export default CredentialsLogin