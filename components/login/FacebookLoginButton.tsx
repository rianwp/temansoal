"use client"

import { signIn } from "next-auth/react"
import { ImFacebook } from "react-icons/im"
import { Button } from "../ui/button"


const FacebookLoginButton = () => {
  return (
    <Button variant="outline" size="lg" className="flex flex-row space-x-2 justify-start items-center w-full" onClick={() => signIn("facebook")}>
      <ImFacebook className="w-8 h-8 text-[#1877F2]"/>
      <p className="text-gray-400">Login dengan Facebook</p>
    </Button>
  )
}

export default FacebookLoginButton