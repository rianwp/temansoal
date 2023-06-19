"use client"

import { motion } from "framer-motion"

const HeroText = () => {
  const animate = {
    initial: { opacity: 0, y: -20},
    in: { opacity: 1, y: 0}
  }
  return (
    <motion.h1
      variants={animate}
      initial="initial"
      animate="in"
      className="text-white lg:text-6xl md:text-5xl sm:text-3xl text-2xl font-bold leading-relaxed md:text-left text-center"
    >
      Membuat Soal, Jadi Lebih Mudah dengan Menggunakan AI
    </motion.h1>
  )
}

export default HeroText