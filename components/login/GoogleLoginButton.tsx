"use client"

import { signIn } from "next-auth/react"
import { FcGoogle} from "react-icons/fc"
import { Button } from "../ui/button"

const GoogleLoginButton = () => {
  return (
    <Button variant="outline" size="lg" className="flex flex-row space-x-2 justify-start items-center w-full" onClick={() => signIn("google")}>
      <FcGoogle className="w-8 h-8"/>
      <p className="text-gray-400">Login dengan Google</p>
    </Button>
  )
}

export default GoogleLoginButton