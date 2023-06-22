"use client"

import CredentialsTabs from "@/components/login/CredentialsTabs"
import FacebookLoginButton from "@/components/login/FacebookLoginButton"
import GoogleLoginButton from "@/components/login/GoogleLoginButton"
import LoginHeader from "@/components/login/LoginHeader"
import LoginScreen from "@/components/login/LoginScreen"

const Login = () => {
  return (
    <div className="w-full flex flex-row h-screen">
      <div className="lg:w-3/5 w-0">
        <LoginScreen/>
      </div>
      <div className="lg:w-2/5 w-full flex justify-center items-center">
        <div className="flex-col justify-center items-center space-y-4">
          <LoginHeader/>
          <CredentialsTabs/>
          {/* <div className="text-gray-400 w-full flex items-center justify-center">ATAU</div>
          <GoogleLoginButton/>
          <FacebookLoginButton/> */}
        </div>
      </div>
    </div>
  )
}

export default Login