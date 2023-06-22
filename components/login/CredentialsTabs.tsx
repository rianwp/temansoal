import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import CredentialsLogin from "./CredentialsLogin"
import CredentialsSignup from "./CredentialsSignup"

const CredentialsTabs = () => {
  return (
    <Tabs defaultValue="login" className="w-full">
      <TabsList className="w-full">
        <TabsTrigger className="w-1/2" value="login">Login</TabsTrigger>
        <TabsTrigger className="w-1/2" value="signup">Sign Up</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <CredentialsLogin/>
      </TabsContent>
      <TabsContent value="signup">
        <CredentialsSignup/>
      </TabsContent>
    </Tabs>
  )
}

export default CredentialsTabs