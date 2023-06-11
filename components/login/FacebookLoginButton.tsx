"use client"

import { signIn } from "next-auth/react"
import { ImFacebook } from "react-icons/im"
import { Button } from "../ui/button"
import { useState } from "react"
import { Loader2 } from "lucide-react"

const FacebookLoginButton = () => {
  const [isClicked, setIsClicked] = useState<Boolean>(false)

  const buttonClick = () => {
    setIsClicked(true)
    signIn("facebook")
  }

  return (
    <Button variant="outline" size="lg" className="flex flex-row space-x-2 justify-start items-center w-full" onClick={buttonClick}>
      {!isClicked ?
        <ImFacebook className="w-8 h-8 text-[#1877F2]"/>
        :
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      }
      <p className="text-gray-400">Login dengan Facebook</p>
    </Button>
  )
}

export default FacebookLoginButton