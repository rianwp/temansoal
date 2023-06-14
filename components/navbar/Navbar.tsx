"use client"

import { useState } from "react"
import NavItem from "./NavItem"
import { useScroll, useMotionValueEvent } from "framer-motion"
import NavbarLogo from "./NavbarLogo"

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
      <div>
        <NavItem onTop={isScrollPositionOnTop} href="/generatesoal">Generate Soal</NavItem>
        <NavItem onTop={isScrollPositionOnTop} href="/">Soal Tersimpan</NavItem>
      </div>
    </div>
  )
}

export default Navbar