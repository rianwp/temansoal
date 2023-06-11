"use client"

import { signIn } from "next-auth/react"
import { FcGoogle} from "react-icons/fc"
import { Button } from "../ui/button"
import { Loader2 } from "lucide-react"
import { useState } from "react"

const GoogleLoginButton = () => {
  const [isClicked, setIsClicked] = useState<Boolean>(false)

  const buttonClick = () => {
    setIsClicked(true)
    signIn("google")
  }
  return (
    <Button variant="outline" size="lg" className="flex flex-row space-x-2 justify-start items-center w-full" onClick={buttonClick}>
      {!isClicked ?
        <FcGoogle className="w-8 h-8"/>
        :
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      }
      <p className="text-gray-400">Login dengan Google</p>
    </Button>
  )
}

export default GoogleLoginButton