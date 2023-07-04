import Image from "next/image"
import Link from "next/link"

interface NavbarLogoProps {
  onTop: boolean
}

const NavbarLogo = ({onTop}: NavbarLogoProps) => {
  const textStyle = onTop ? "text-white" : "text-sky-600"
  const whiteLogo = onTop ? "block" : "hidden"
  const colorLogo = onTop ? "hidden" : "block"
  return (
    <Link href="/" className="flex flex-row justify-between items-center space-x-2">
        <Image className={whiteLogo} src="/logowhite.png" alt="Logo" width={32} height={24}/>
        <Image className={colorLogo} src="/logo.png" alt="Logo" width={32} height={24}/>
      <p className={`${textStyle} font-medium text-base`}>Teman Soal</p>
    </Link>
  )
}

export default NavbarLogo