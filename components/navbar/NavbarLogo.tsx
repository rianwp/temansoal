import Image from "next/image"
import Link from "next/link"

interface NavbarLogoProps {
  onTop: boolean
}

const NavbarLogo = ({onTop}: NavbarLogoProps) => {
  const textStyle = onTop ? "text-white" : "text-sky-500"
  return (
    <Link href="/" className="flex flex-row justify-between items-center space-x-2">
      {onTop ?
        <Image src="/logowhite.png" alt="Logo" width={32} height={24}/>
        :
        <Image src="/logo.png" alt="Logo" width={32} height={24}/>
      }
      <p className={`${textStyle} font-medium text-sm`}>Teman Soal</p>
    </Link>
  )
}

export default NavbarLogo