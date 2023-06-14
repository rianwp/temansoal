import { BiMenu } from "react-icons/bi"

interface MenuButtonProps {
  onTop: boolean
}

const MenuButton = ({onTop}: MenuButtonProps) => {
  const textStyle = onTop ? "text-white" : "text-black"
  return (
    <BiMenu className={`${textStyle} w-8 h-8`}/>
  )
}

export default MenuButton