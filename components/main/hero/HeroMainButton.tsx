"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

const HeroMainButton = () => {
  const animate = {
    initial: { opacity: 0, y: -20},
    in: { opacity: 1, y: 0}
  }
  return (
    <motion.div
      variants={animate}
      initial="initial"
      animate="in"
    >
      <Button size="lg">Coba Sekarang</Button>
    </motion.div>
  )
}

export default HeroMainButton