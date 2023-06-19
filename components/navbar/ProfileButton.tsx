import initialName from "@/utils/initialName"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "../ui/menubar"
import { Separator } from "../ui/separator"
import { signOut, useSession } from "next-auth/react"

const ProfileButton = () => {
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
            <div className="flex flex-col items-start">
              <p className="font-semibold text-sm line-clamp-1">{session?.user?.name}</p>
              <p className="font-normal text-sm line-clamp-1">{session?.user?.email}</p>
            </div>
            <Separator/>
            <MenubarItem>
              <button onClick={() => signOut()}>Logout</button>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  )
}

export default ProfileButton