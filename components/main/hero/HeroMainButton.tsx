"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"

const HeroMainButton = () => {
  const animate = {
    initial: { opacity: 0, y: -20},
    in: { opacity: 1, y: 0},
    hover: { scale: 1.05 },
  }
  return (
    <motion.div
      variants={animate}
      initial="initial"
      whileInView="in"
      whileHover="hover"
      viewport={{ once: true }}
    >
      <Link href="/buatsoal">
        <Button size="lg">
          Coba Sekarang
        </Button>
      </Link>
    </motion.div>
  )
}

export default HeroMainButton