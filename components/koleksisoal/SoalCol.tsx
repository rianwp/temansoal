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
      <TableCell className="w-10 font-bold align-text-top">{urutan}</TableCell>
      <TableCell className="w-full font-bold align-text-top">{soal}</TableCell>
      <TableCell className="w-2/12 align-text-top">{pilihan ? "Pilihan Ganda" : "Essay"}</TableCell>
      <TableCell className="w-2/12 align-text-top">{mapel}</TableCell>
      <TableCell className="w-3/12 flex flex-row items-center h-full space-x-2">
        <Dialog>
          <DialogTrigger className={`${buttonVariants({ variant: "outline" })} flex flex-row space-x-2 items-center justify-center`}>
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
        <Button disabled={isLoading} variant="destructive" size="sm" onClick={handleDelete}>
          {isLoading ?
            <Loader2 className="animate-spin" />
            :
            <Trash2 />
          }
        </Button>
      </TableCell>
    </TableRow>
  )
}

export default SoalCol