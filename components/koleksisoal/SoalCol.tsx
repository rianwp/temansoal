import { TableCell, TableRow } from "../ui/table"
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog"
import SoalPopup from "./SoalPopup"
import { Button, buttonVariants } from "../ui/button"
import { Trash2 } from "lucide-react"
import pilihan from "@/types/pilihan"
import { useMutation } from "@tanstack/react-query"
import { deleteFetcher } from "@/lib/fetcher"
import { koleksiSoalState } from "@/lib/state"
import { useRecoilState } from "recoil"
import soalTersimpan from "@/types/soalTersimpan"
import { Loader2 } from "lucide-react"

interface SoalColProps {
  id?: string
  soal: string,
  pilihan?: Array<pilihan>,
  jawaban: string,
  urutan: number,
  pembahasan: string,
  mapel: string
}

const SoalCol = ({soal, jawaban, pilihan, pembahasan, mapel, urutan, id}: SoalColProps) => {
  const [koleksiSoal, setKoleksiSoal] = useRecoilState<soalTersimpan[]>(koleksiSoalState)
  const { isLoading, isError, data: deleteSoalTersimpan, mutateAsync } = useMutation({
    mutationKey: ["deleteSoalTersimpan"],
    mutationFn: () =>
      deleteFetcher(`/api/koleksisoal?id=${id}`)
  })
  const handleDelete = async () => {
    if(!isLoading){
      await mutateAsync()
      if(!isLoading){
        if(!isError){
          const koleksiSoalAfterDelete = koleksiSoal.filter((item) => item.id !== id)
          setKoleksiSoal(koleksiSoalAfterDelete)
        }
      }
    }
  }
  return (
    <TableRow>
      <TableCell className="w-10 font-bold text-gray-400 text-center">{urutan}</TableCell>
      <TableCell className="w-8/12 font-semibold h-4">
        <p className="line-clamp-1">{soal}</p>
      </TableCell>
      <TableCell className="w-1/12">{pilihan ? "Pilihan Ganda" : "Essay"}</TableCell>
      <TableCell className="w-1/12">{mapel}</TableCell>
      <TableCell className="w-2/12">
        <div className="flex flex-row items-center h-full space-x-2 w-full justify-center">
          <Dialog>
            <DialogTrigger className={`${buttonVariants({ variant: "outline" })} flex flex-row space-x-2 items-center justify-center w-auto whitespace-nowrap`}>
              Lihat Soal
            </DialogTrigger>
            <DialogContent className="md:w-1/2 w-full min-h-[50vh] self-center justify-self-center max-w-screen-md">
              <SoalPopup
                id={id}
                soal={soal}
                jawaban={jawaban}
                mapel={mapel}
                pembahasan={pembahasan}
                pilihan={pilihan}
              />
            </DialogContent>
          </Dialog>
          <Button className="w-11" disabled={isLoading} variant="destructive" size="sm" onClick={handleDelete}>
            {isLoading ?
              <Loader2 className="animate-spin w-8 h-8" />
              :
              <Trash2 className="w-8 h-8"/>
            }
          </Button>
        </div>
      </TableCell>
    </TableRow>
  )
}

export default SoalCol