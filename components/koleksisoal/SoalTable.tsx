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
import TableSkeleton from "./TableSkeleton"

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
            <TableHead className="w-10"></TableHead>
            <TableHead className="w-8/12">Soal</TableHead>
            <TableHead className="w-1/12">Jenis Soal</TableHead>
            <TableHead className="w-1/12">Mata Pelajaran</TableHead>
            <TableHead className="w-2/12 text-center">Detail</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!isDataLoading ?
            koleksiSoal.map((item, index) =>(
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
            ))
            :
            <TableSkeleton/>
          }
        </TableBody>
      </Table>
    </Card>
  )
}

export default SoalTable