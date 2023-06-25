import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import SoalCol from "./SoalCol"
import { Card } from "../ui/card"
import soalTersimpan from "@/types/soalTersimpan"
import TableSkeleton from "./TableSkeleton"
import { useQuery } from "@tanstack/react-query"
import { getFetcher } from "@/lib/fetcher"


const SoalTable = () => {
  const { isLoading, data: koleksiSoalInitial, isRefetching } = useQuery({
    queryKey: ["koleksiSoalInitial"],
    queryFn: () => 
      getFetcher("/api/koleksisoal"),
    refetchOnWindowFocus: false,
  })
  const koleksiSoalData: Array<soalTersimpan> = koleksiSoalInitial?.soalTersimpan
  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10"></TableHead>
            <TableHead className="md:w-6/12 w-8/12">Soal</TableHead>
            <TableHead className="md:w-2/12 w-1/12">Jenis Soal</TableHead>
            <TableHead className="w-2/12">Mata Pelajaran</TableHead>
            <TableHead className="md:w-2/12 w-1/12 text-center">Detail</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!isLoading && !isRefetching ?
            koleksiSoalData.length > 0 ?
              koleksiSoalData.map((item, index) =>(
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
              <TableRow>
                <TableCell>
                  <p className="whitespace-nowrap">Tidak ada Data</p>
                </TableCell>
              </TableRow>
              
            :
            <TableSkeleton/>
          }
        </TableBody>
      </Table>
    </Card>
  )
}

export default SoalTable