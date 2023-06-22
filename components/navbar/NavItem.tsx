import Link from "next/link"
import { Button } from "../ui/button"

interface NavItemProps {
  children: React.ReactNode,
  href: string,
  onTop: boolean
}

const NavItem = ({children, href, onTop}: NavItemProps) => {
  const hover = onTop ? "hover:bg-white/20 text-white" : "hover:bg-black/10 text-sky-600"
  return (
    <Link href={href}>
      <Button className={`${hover} bg-transparent`}>
        {children}
      </Button>
    </Link>
  )
}

export default NavItem