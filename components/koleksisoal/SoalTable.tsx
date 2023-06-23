import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import SoalCol from "./SoalCol"
import { Card } from "../ui/card"
import soalTersimpan from "@/types/soalTersimpan"
import { koleksiSoalState } from "@/lib/state"
import { useRecoilState } from "recoil"

interface SoalTableProps {
  initialData: Array<soalTersimpan>,
  isDataLoading: boolean
}
const SoalTable = ({initialData, isDataLoading}: SoalTableProps) => {
  const [koleksiSoal, setKoleksiSoal] = useRecoilState<soalTersimpan[]>(koleksiSoalState)
  if(koleksiSoal.length === 0){
    setKoleksiSoal(initialData)
  }
  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10">No</TableHead>
            <TableHead className="w-full align-middle">Soal</TableHead>
            <TableHead className="w-2/12 align-middle">Jenis Soal</TableHead>
            <TableHead className="w-2/12 align-middle">Mata Pelajaran</TableHead>
            <TableHead className="w-3/12 align-middle text-center">Detail</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {koleksiSoal.map((item, index) =>(
            <SoalCol
              id={item.id}
              urutan={index+1}
              key={index}
              soal={item.soal}
              mapel={item.mapel}
              jawaban={item.jawaban}
              pembahasan={item.pembahasan}
              pilihan={item.pilihan}
            />
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}

export default SoalTable