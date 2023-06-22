"use client"

import { Loader2 } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { useState, useEffect } from "react"
import { Checkbox } from "../ui/checkbox"
import validateEmail from "@/utils/validateEmail"
import { toast } from "../ui/use-toast"
import { postFetcher } from "@/lib/fetcher"
import { useMutation } from "@tanstack/react-query"
import createAccount from "@/types/createAccount"

const CredentialsSignup = () => {
  const { isLoading, isError, data: createAccount, mutateAsync } = useMutation({
    mutationKey: ["createAccount"],
    mutationFn: (data: createAccount) =>
      postFetcher("/api/auth/signup", data)
  })
  const [isClicked, setIsClicked] = useState<boolean>(false)
  const [nama, setNama] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [isPasswordValidate, setIsPasswordValidate] = useState<boolean>(false)
  const [isEmailValidate, setIsEmailValidate] = useState<boolean>(false)
  const [isNamaValidate, setIsNamaValidate] = useState<boolean>(false)

  useEffect(() => {
    if (!validateEmail(email)) {
      setIsEmailValidate(false)
    } else {
      setIsEmailValidate(true)
    }

    if (nama.length === 0){
      setIsNamaValidate(false)
    } else{
      setIsNamaValidate(true)
    }

    if (password.length < 8) {
      setIsPasswordValidate(false)
    } else {
      setIsPasswordValidate(true)
    }
  }, [email, password, nama])

  
  const buttonClick = async () => {
    setIsClicked(true)
    if(isEmailValidate && isNamaValidate && isPasswordValidate) {
      const data = {
        email,
        nama,
        password
      }
      await mutateAsync(data)
    }
    setIsClicked(false)
  }
  useEffect(() => {
    if(!isLoading && isClicked){
      if(isError) {
        toast({
          variant: "destructive",
          title: "Sign Up Gagal",
          description: "Terjadi Kesalahan pada Server"
        })
      } else{
        if(createAccount?.success){
          toast({
            variant: "default",
            title: "Sign Up Berhasil",
            description: createAccount?.message
          })
        } else{
          toast({
            variant: "destructive",
            title: "Sign Up Gagal",
            description: createAccount?.message
          })
        }
      }
    }
  }, [isLoading, isClicked])
    
  return (
    <div className="w-full flex flex-col items-center space-y-3">
      <div className="flex flex-col items-start space-y-1.5 w-full">
        <label htmlFor="nama" className="text-sm font-medium">Nama</label>
        <Input className="w-full" id="nama" onChange={(event) => setNama(event.target.value)} type="text" placeholder="Masukan Nama..." />
        {!isNamaValidate && isClicked ?
          <p className="text-red-600 text-sm">Nama Tidak Boleh Ksoong</p>
          :
          null
        }
      </div>
      <div className="flex flex-col items-start space-y-1.5 w-full">
        <label htmlFor="email" className="text-sm font-medium">Email</label>
        <Input className="w-full" id="email" onChange={(event) => setEmail(event.target.value)} type="email" placeholder="Masukan Email..." />
        {!isEmailValidate && isClicked ?
          <p className="text-red-600 text-sm">Email Tidak Valid</p>
          :
          null
        }
      </div>
      <div className="flex flex-col items-start space-y-1.5 w-full">
        <label htmlFor="password" className="text-sm font-medium">Password</label>
        <Input className="w-full" id="password" onChange={(event) => setPassword(event.target.value)} type={showPassword ? "text" : "password"} placeholder="Masukan Password..." />
        <div className="flex flex-row space-x-2 pt-1 pb-3">
          <Checkbox id="checbox" onClick={() => setShowPassword(!showPassword)} />
          <label htmlFor="checkbox" className="text-sm">Tampilkan Password</label>
        </div>
        {!isPasswordValidate && isClicked ?
          <p className="text-red-600 text-sm">Password Minimal 8 Karakter</p>
          :
          null
        }
      </div>
      <Button disabled={isLoading} size="lg" className="flex flex-row space-x-2 justify-center items-center w-full" onClick={buttonClick}>
        {isLoading ?
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          :
          null
        }
        <p>Sign Up</p>
      </Button>
    </div>
  )
}

export default CredentialsSignup