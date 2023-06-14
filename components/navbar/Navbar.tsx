"use client"

import { useState } from "react"
import { useScroll, useMotionValueEvent } from "framer-motion"
import NavbarLogo from "./NavbarLogo"
import NavItem from "./NavItem"
import Link from "next/link"
import MenuButton from "./MenuButton"
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "../ui/menubar"
import LoginButton from "./LoginButton"



const Navbar = () => {
  const [isScrollPositionOnTop, setIsScrollPositionOnTop] = useState<boolean>(true)
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, "change", (latest) => {
    if(latest > 0){
      setIsScrollPositionOnTop(false)
    } else {
      setIsScrollPositionOnTop(true)
    }
  })
  const navBg = isScrollPositionOnTop ? "bg-transparent" : "bg-white"
  return (
    <div className={`${navBg} w-full inset-x-0 fixed top-0 flex justify-between items-center z-10 p-3 lg:px-10 h-16 transition duration-300`}>
      <div>
        <NavbarLogo onTop={isScrollPositionOnTop}/>
      </div>
      <div className="hidden md:block space-x-2">
        <NavItem onTop={isScrollPositionOnTop} href="/generatesoal">Generate Soal</NavItem>
        <NavItem onTop={isScrollPositionOnTop} href="/">Soal Tersimpan</NavItem>
        <LoginButton/>
      </div>
      <div className="md:hidden block">
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>
              <MenuButton onTop={isScrollPositionOnTop}/>
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                <Link href="/generatesoal">Generate Soal</Link>
              </MenubarItem>
              <MenubarItem>
                <Link href="/">Soal Tersimpan</Link>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
    </div>
  )
}

export default Navbar