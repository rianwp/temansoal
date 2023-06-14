import Link from "next/link"
import { Button } from "../ui/button"

const LoginButton = () => {
  return (
    <Button>
      <Link href="/login">Login</Link>
    </Button>
  )
}

export default LoginButton