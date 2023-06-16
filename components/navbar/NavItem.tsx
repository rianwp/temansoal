import Link from "next/link"
import { Button } from "../ui/button"

interface NavItemProps {
  children: React.ReactNode,
  href: string,
  onTop: boolean
}

const NavItem = ({children, href, onTop}: NavItemProps) => {
  const hover = onTop ? "hover:bg-secondary/20 text-secondary" : "hover:bg-black/10 text-sky-600"
  return (
    <Button className={`${hover} bg-transparent`}>
      <Link href={href}>{children}</Link>
    </Button>
  )
}

export default NavItem