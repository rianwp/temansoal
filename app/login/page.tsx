import FacebookLoginButton from "@/components/login/FacebookLoginButton"
import GoogleLoginButton from "@/components/login/GoogleLoginButton"
import LoginHeader from "@/components/login/LoginHeader"
import LoginScreen from "@/components/login/LoginScreen"

const Login = () => {
  return (
    <div className="w-full flex flex-row h-screen">
      <div className="w-3/5">
        <LoginScreen/>
      </div>
      <div className="w-2/5 flex justify-center items-center">
        <div className="flex-col justify-center items-center space-y-4">
          <LoginHeader/>
          <GoogleLoginButton/>
          {/* <FacebookLoginButton/> */}
        </div>
      </div>
    </div>
  )
}

export default Login
