import pilihan from "@/types/pilihan"
import { Card } from "../ui/card"

interface SoalCardProps {
  soal: string,
  pilihan?: Array<pilihan>,
  jawaban: string | pilihan,
  urutan: number,
  pembahasan?: string,
  mapel: string
}

const SoalCard = ({soal, pilihan, jawaban, urutan, pembahasan, mapel}: SoalCardProps) => {
  return (
    <Card className="w-full p-4">
      <h2 className="flex flex-row items-start">
        <div className="bg-primary text-sm text-secondary rounded-full flex justify-center items-center h-5 w-5 shrink-0">{urutan}</div>
        <p className="ml-1 text-base font-semibold">{soal}</p>
      </h2>
      <div className="pl-6 w-full">
        {pilihan ?
          <div className="flex flex-col space-y-1">
            {pilihan.map((item, index) => (
              <p key={index} className="flex flex-row items-center text-base space-x-1">
                <p className="font-semibold">{item.huruf}.</p>
                <p className="font-normal">{item.deskripsi}</p>
              </p>
            ))}
          </div>
          :
          null
        }
        <div className="flex flex-col">
          <div className="flex flex-row items-start space-x-2">
            <p className="font-normal text-base">Jawaban: </p>
            <p className="font-semibold text-sky-600">{typeof jawaban === "string" ? jawaban : `${jawaban.huruf}. ${jawaban.deskripsi}`}</p>
          </div>
          <div className="flex flex-row items-start space-x-2">
            <p className="font-normal text-base">Pembahasan: </p>
            <p className="font-normal text-base">{pembahasan}</p>
          </div>
        </div>
      </div>
    </Card>
    //tombol menambahkan soal ke database
  )
}

export default SoalCard