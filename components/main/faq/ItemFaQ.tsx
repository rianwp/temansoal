import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface ItemFaQProps {
  urutan: number,
  judul: string,
  deskripsi: string
}

const ItemFaQ = ({urutan, judul, deskripsi}: ItemFaQProps) => {
  return (
    <AccordionItem value={`value-${urutan}`}>
      <AccordionTrigger className="text-left">{judul}</AccordionTrigger>
      <AccordionContent>
        {deskripsi}
      </AccordionContent>
    </AccordionItem>
  )
}

export default ItemFaQ