"use client"

import { getFetcher } from "@/lib/fetcher"
import { useQuery } from "@tanstack/react-query"
import { motion } from "framer-motion"

const HeroCounter = () => {

  const { data: counter, isLoading, isError } = useQuery({
    queryKey: ["counter"],
    queryFn: () => 
      getFetcher("/api/counter")
  })
  const animate = {
    initial: { opacity: 0, y: -20},
    in: { opacity: 1, y: 0}
  }
  return (
    <motion.h1
      variants={animate}
      initial="initial"
      whileInView="in"
      viewport={{ once: true }}
      className="text-white text-base leading-relaxed md:text-left text-center mt-5"
    >
      <p className="font-semibold inline-block">{!isLoading && !isError ? counter.usersCount : 0}</p> Pengguna Aktif Telah Membuat <p className="font-semibold inline-block">{!isLoading && !isError ? counter.usageCount : 0}</p> Total Soal
    </motion.h1>
  )
}

export default HeroCounter