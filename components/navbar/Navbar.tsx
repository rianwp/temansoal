"use client"

import { useState } from "react"
import { useScroll, useMotionValueEvent } from "framer-motion"
import NavbarLogo from "./NavbarLogo"
import NavItem from "./NavItem"
import Link from "next/link"
import MenuButton from "./MenuButton"
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "../ui/menubar"
import LoginButton from "./LoginButton"
import { Separator } from "../ui/separator"
import { useSession, signOut } from "next-auth/react"
import ProfileButton from "./ProfileButton"
import ProfileInfo from "./ProfileInfo"
import { getFetcher } from "@/lib/fetcher"
import { useQuery } from "@tanstack/react-query"

interface NavbarProps {
  isHome: boolean
}

const Navbar = ({isHome}: NavbarProps) => {
  const { data: session, status } = useSession()
  const isSessionLoading = status === "loading" 
  const { data: accountStatus } = useQuery({
    queryKey: ["accountStatus"],
    queryFn: () =>
      getFetcher("/api/accountstatus")
  })
  const isPremium = accountStatus?.isPremium ? "Premium" : "Free"
  const [isScrollPositionOnTop, setIsScrollPositionOnTop] = useState<boolean>(true)
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, "change", (latest) => {
    if(latest === 0){
      setIsScrollPositionOnTop(true)
    } else {
      setIsScrollPositionOnTop(false)
    }
  })
  const navBg = isHome ? (isScrollPositionOnTop ? "bg-transparent" : "bg-white border-b border-gray-200") : "bg-white border-b border-gray-200"
  return (  
    <div className={`${navBg} w-full inset-x-0 fixed top-0 flex justify-between items-center z-10 p-4 md:px-10 h-16 transition duration-300`}>
      <div className="flex flex-row space-x-4">
        <NavbarLogo onTop={isHome ? isScrollPositionOnTop : false}/>
        <div className="hidden md:flex flex-row">
          <NavItem onTop={isHome ? isScrollPositionOnTop : false} href="/buatsoal">Buat Soal</NavItem>
          <NavItem onTop={isHome ? isScrollPositionOnTop : false} href="/koleksisoal">Koleksi Soal</NavItem>
        </div>
      </div>
      <div className="hidden md:block">
        {!isSessionLoading ? 
            session?.user ?
              <ProfileButton status={isPremium}/>
              :
              <LoginButton/>
          :
          null
        }
      </div>
      <div className="md:hidden block">
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>
              <MenuButton onTop={isHome ? isScrollPositionOnTop : false}/>
            </MenubarTrigger>
            <MenubarContent>
              {!isSessionLoading ? 
                session?.user ? <ProfileInfo name={session?.user?.name || ""} email={session?.user?.email || ""} status={isPremium}/> : null 
                :
                null
              }
              <Link href="/buatsoal">
                <MenubarItem>
                  Buat Soal
                </MenubarItem>
              </Link>
              <Link href="/koleksisoal">
                <MenubarItem>
                  Koleksi Soal
                </MenubarItem>
              </Link>
              <Separator/>
              {!isSessionLoading ? 
                  session?.user ?
                    <button onClick={() => signOut()}>
                      <MenubarItem>
                        Logout
                      </MenubarItem>
                    </button>
                    :
                    <Link href="/login">
                      <MenubarItem>
                        Login
                      </MenubarItem>
                    </Link>
                :
                null
              }
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
    </div>
  )
}

export default Navbar