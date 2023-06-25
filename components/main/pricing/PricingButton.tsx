"use client"

import { motion } from "framer-motion"
import { buttonVariants } from "@/components/ui/button"

interface PricingButtonProps {
  onClick?: () => void,
  children: React.ReactNode,
  disabled?: boolean
}

const animate = {
  hover: { scale: 1.05 },
}

const PricingButton = ({onClick, children, disabled}: PricingButtonProps) => {
  return (
    <motion.button
      disabled={disabled}
      onClick={onClick} 
      className={`bg-gradient-to-r from-blue-600 to-sky-500 hover:bg-sky-600 w-full ${buttonVariants()}`}
      variants={animate}
      whileHover="hover"
    >
      {children}
    </motion.button>
  )
}

export default PricingButton