import { Edit3, Library } from "lucide-react"
import ItemFitur from "./ItemFitur"

const FiturList = () => {
  return (
    <div className="md:w-1/2 w-11/12 p-4 flex-col flex space-y-6">
      <ItemFitur
        icon={<Edit3 className="w-8 h-8"/>}
        judul="Buat Soal"
        deskripsi="Buat soal dengan mudah dan praktis, hanya dengan memasukkan tema soal saja."
      />
      <ItemFitur
        icon={<Library className="w-8 h-8"/>}
        judul="Koleksi Soal"
        deskripsi="Menyimpan soal yang telah dibuat ke dalam koleksi soal"
      />
    </div>
  )
}

export default FiturList