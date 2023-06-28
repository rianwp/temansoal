"use client"

import { motion } from "framer-motion"

interface ItemDeskripsiProps {
  icon: React.ReactNode,
  judul: string,
  deskripsi: string
}

const ItemDeskripsi = ({icon, judul, deskripsi}: ItemDeskripsiProps) => {
  const animate = {
    initial: { opacity: 0, y: -20, scale: 0.5},
    in: { opacity: 1, y: 0, scale: 1}
  }
  return (
    <motion.div
      variants={animate}
      whileInView="in"
      initial="initial"
      viewport={{ once: true }}
      className="flex flex-col space-y-2 w-full"
    >
      <div className="flex flex-row space-x-2 items-center">
        {icon}
        <p className="text-base font-semibold">{judul}</p>
      </div>
      <div className="w-full text-left text-base font-light">
        {deskripsi}
      </div>
    </motion.div>
  )
}

export default ItemDeskripsi