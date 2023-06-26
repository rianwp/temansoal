import { Accordion } from "@/components/ui/accordion"
import { faq } from "@/lib/data"
import ItemFaQ from "./ItemFaQ"
import SectionTitle from "../SectionTitle"

const FaQ = () => {
  return (
    <div className="w-full py-20">
      <SectionTitle>Frequently Asked Questions</SectionTitle>
      <Accordion type="single" collapsible className="w-11/12 p-4 mx-auto">
        {faq.map((item, index) => (
          <ItemFaQ
            key={index}
            urutan={index+1}
            judul={item.judul}
            deskripsi={item.deskripsi}
          />
        ))}
      </Accordion>
    </div>
  )
}

export default FaQ