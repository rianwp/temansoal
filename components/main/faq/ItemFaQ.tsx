"use client"

import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { motion } from "framer-motion"

interface ItemFaQProps {
  urutan: number,
  judul: string,
  deskripsi: string
}

const ItemFaQ = ({urutan, judul, deskripsi}: ItemFaQProps) => {
  const animate = {
    initial: { opacity: 0, y: -20},
    in: { opacity: 1, y: 0}
  }
  return (
    <motion.div
      variants={animate}
      whileInView="in"
      initial="initial"
      viewport={{ once: true }}
    >
      <AccordionItem value={`value-${urutan}`}>
        <AccordionTrigger className="text-left">{judul}</AccordionTrigger>
        <AccordionContent>
          {deskripsi}
        </AccordionContent>
      </AccordionItem>
    </motion.div>
  )
}

export default ItemFaQ