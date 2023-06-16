import pilihan from "@/types/pilihan"
import { Card } from "../ui/card"
import jawaban from "@/types/jawaban"

interface SoalCardProps {
  soal: string,
  pilihan?: pilihan[],
  jawaban: string | jawaban,
  urutan: number,
  pembahasan: string
}

const SoalCard = ({soal, pilihan, jawaban, urutan, pembahasan}: SoalCardProps) => {

  let deskripsiJawaban
  if(typeof jawaban !== "string"){
    deskripsiJawaban = pilihan?.find((item) => item.huruf.toLowerCase() === jawaban?.huruf)?.deskripsi
  }
  return (
    <Card className="w-full p-4">
      <h2 className="flex flex-row items-center">
        <div className="bg-primary text-sm text-secondary rounded-full flex justify-center items-center h-5 w-5 shrink-0">{urutan}</div>
        <p className="ml-1 text-base font-semibold">{soal}</p>
      </h2>
      <div className="pl-6 w-full">
        {pilihan ?
          <div className="flex flex-col space-y-1">
            {pilihan.map((item, index) => (
              <p key={index} className="flex flex-row text-base">
                <p className="font-medium">{item.huruf}. </p>
                <p className="font-normal">{item.deskripsi}</p>
              </p>
            ))}
          </div>
          :
          null
        }
        <div className="flex flex-col">
          {typeof jawaban === "string" ?
            <div className="flex flex-row items-start space-x-2">
              <p className="font-normal text-base">Jawaban: </p>
              <p className="font-semibold text-sky-600">{jawaban}</p>
            </div>
            :
            <div className="flex flex-row items-start space-x-2">
              <p className="font-normal text-base">Jawaban: </p>
              <p className="flex flex-row text-base text-sky-600">
                <p className="font-semibold">{jawaban.huruf}. </p>
                <p className="font-semibold">{deskripsiJawaban}</p>
              </p>
            </div>
          }
          <div className="flex flex-row items-start space-x-2">
            <p className="font-normal text-base">Pembahasan: </p>
            <p className="font-semibold text-base">{pembahasan}</p>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default SoalCard