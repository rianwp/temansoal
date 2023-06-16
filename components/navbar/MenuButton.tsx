import { AlignJustify } from "lucide-react"

interface MenuButtonProps {
  onTop: boolean
}

const MenuButton = ({onTop}: MenuButtonProps) => {
  const textStyle = onTop ? "text-secondary" : "text-primary"
  return (
    <AlignJustify className={`${textStyle} w-8 h-8`}/>
  )
}

export default MenuButton