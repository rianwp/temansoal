import { Pointer, Wallet, Zap } from "lucide-react"
import ItemKeunggulan from "./ItemKeunggulan"

const KeunggulanList = () => {
  return (
    <div className="md:w-1/2 w-11/12 p-4 flex-col flex space-y-6">
      <ItemKeunggulan
        icon={<Pointer className="w-8 h-8"/>}
        judul="Mudah Digunakan"
        deskripsi="Dapat digunakan dengan mudah menggunakan berbagai perangkat."
      />
      <ItemKeunggulan
        icon={<Wallet className="w-8 h-8"/>}
        judul="Harga Terjangkau"
        deskripsi="Biaya langganan perbulan murah, mendukung berbagai cara pembayaran."
      />
      <ItemKeunggulan
        icon={<Zap className="w-8 h-8"/>}
        judul="Cepat dan Dapat Diandalkan"
        deskripsi="Dengan dukungan artificial intelligence ChatGPT, buat soal menjadi secepat kilat."
      />
    </div>
  )
}

export default KeunggulanList