import Link from "next/link"
import { Button } from "../ui/button"

const LoginButton = () => {
  return (
    <Link href="/login">
      <Button>Login</Button>
    </Link>
    
  )
}

export default LoginButton