import pilihan from "@/types/pilihan"
import { Card } from "../ui/card"
import { Button } from "../ui/button"
import { postFetcher } from "@/lib/fetcher"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import soalTersimpan from "@/types/soalTersimpan"
import { BookmarkPlus, Check, Loader2 } from "lucide-react"
import { mataPelajaran } from "@/lib/data"
import { useToast } from "../ui/use-toast"
import { motion } from "framer-motion"

interface SoalCardProps {
  soal: string,
  pilihan?: Array<pilihan>,
  jawaban: string | pilihan,
  urutan: number,
  pembahasan: string,
  mapel: string
}

const SoalCard = ({soal, pilihan, jawaban, urutan, pembahasan, mapel}: SoalCardProps) => {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const { isLoading, isSuccess, data: simpanSoal, mutateAsync, isError } = useMutation({
    mutationKey: ["simpanSoal"],
    mutationFn: (data: soalTersimpan) =>
      postFetcher("/api/koleksisoal", data),
    onSuccess: () => queryClient.invalidateQueries(["koleksiSoalInitial"])
  })
  const handleClick = async () => {
    if(!isLoading){
      const data: soalTersimpan = {
        soal,
        pilihan,
        jawaban: typeof jawaban === "string" ? jawaban : `${jawaban.huruf}. ${jawaban.deskripsi}`,
        mapel: mataPelajaran.find((item) => item.nama.toLowerCase() === mapel)?.nama || "",
        pembahasan
      }
      await mutateAsync(data)
      if(!isLoading){
        if(isError){
          toast({
            variant: "destructive",
            title: "Terjadi Kesalahan",
          })
        }
      }
    }
  }
  const animate = {
    initial: { opacity: 0, y: -20, scale: 0.5},
    in: { opacity: 1, y: 0, scale: 1}
  }
  return (
    <motion.div variants={animate} animate="in" initial="initial">
      <Card className="w-full p-4">
        <h2 className="flex flex-row items-start">
          <div className="bg-primary text-sm text-secondary rounded-full flex justify-center items-center h-5 w-5 shrink-0">{urutan}</div>
          <p className="ml-1 text-base font-semibold">{soal}</p>
        </h2>
        <div className="pl-6 w-full">
          {pilihan ?
            <div className="flex flex-col space-y-1 mt-2">
              {pilihan.map((item, index) => (
                <p key={index} className="flex flex-row items-start text-base space-x-1">
                  <p className="font-semibold">{item.huruf}.</p>
                  <p className="font-normal">{item.deskripsi}</p>
                </p>
              ))}
            </div>
            :
            null
          }
          <div className="flex flex-col">
            <div className="flex flex-row items-start space-x-2 mt-2">
              <p className="font-normal text-base">Jawaban: </p>
              <p className="font-semibold text-sky-600">{typeof jawaban === "string" ? jawaban : `${jawaban.huruf}. ${jawaban.deskripsi}`}</p>
            </div>
            <div className="flex flex-row items-start space-x-2 mt-2">
              <p className="font-normal text-base">Pembahasan: </p>
              <p className="font-normal text-base">{pembahasan}</p>
            </div>
          </div>
        </div>
        <div className="w-full justify-end flex flex-row items-center mt-2">
          {isSuccess ?
            <Button disabled={true} className="flex flex-row space-x-2" variant="outline">
              <Check className="h-5 w-5 text-gray-400"/>
              <p>Soal Tersimpan</p>
            </Button>
            :
            <Button disabled={isLoading} className="flex flex-row space-x-2" variant="outline" onClick={handleClick}>
              {isLoading ?
                <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
                :
                <BookmarkPlus className="h-5 w-5 text-gray-400"/>
              }
              <p>Simpan Soal</p>
            </Button>
          }
        </div>
      </Card>
    </motion.div>
  )
}

export default SoalCard