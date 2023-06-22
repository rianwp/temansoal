import initialName from "@/utils/initialName"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "../ui/menubar"
import { Separator } from "../ui/separator"
import { signOut, useSession } from "next-auth/react"
import ProfileInfo from "./ProfileInfo"

interface ProfileButtonProps {
  status: string
}

const ProfileButton = ({status}: ProfileButtonProps) => {
  const { data: session } = useSession()
  return (
    <div className="hidden md:block">
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>
            <Avatar>
              <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || "Profile"} />
              <AvatarFallback>{initialName(session?.user?.name || "")}</AvatarFallback>
            </Avatar>
          </MenubarTrigger>
          <MenubarContent>
            <ProfileInfo name={session?.user?.name || ""} email={session?.user?.email || ""} status={status}/>
            <Separator/>
            <MenubarItem>
              <button className="w-full flex flex-row justify-start" onClick={() => signOut()}>
                Logout
              </button>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  )
}

export default ProfileButton