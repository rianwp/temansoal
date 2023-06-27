"use client"

import Image from "next/image"
import { motion } from "framer-motion"

const OpenaiLogo = () => {
  const animate = {
    initial: { opacity: 0, y: -20},
    in: { opacity: 1, y: 0}
  }
  return (
    <motion.div 
      className="flex flex-row space-x-1.5 whitespace-nowrap items-end"
      variants={animate}
      initial="initial"
      whileInView="in"
      viewport={{ once: true }}
    >
      <p className="text-white opacity-50 text-sm">Powered by</p>
      <Image className="opacity-50" src="/openai.png" alt="openai" width={88} height={50}/>
    </motion.div>
  )
}

export default OpenaiLogo