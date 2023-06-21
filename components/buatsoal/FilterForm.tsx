import { isGenerateSoalClickedState, isLimitBarFirstCallState, mataPelajaranState } from "@/lib/state"
import FormMataPelajaran from "./FormMataPelajaran"
import LimitBar from "./LimitBar"
import { useRecoilState, useRecoilValue } from "recoil"
import FormTopik from "./FormTopik"
import FormTingkatKesulitan from "./FormTingkatKesulitan"
import FormJenisSoal from "./FormJenisSoal"
import { Button } from "../ui/button"
import FormJumlahSoal from "./FormJumlahSoal"
import { useEffect, useState } from "react"
import { Skeleton } from "../ui/skeleton"
import { getFetcher } from "@/lib/fetcher"
import { useQuery } from "@tanstack/react-query"

interface FilterFormProps {
  onClick: () => void
}

const FilterForm = ({onClick}: FilterFormProps) => {
  const mapel = useRecoilValue<string>(mataPelajaranState)
  const isGenerating = useRecoilValue<boolean>(isGenerateSoalClickedState)
  const isGenerateSoalClicked = useRecoilValue<boolean>(isGenerateSoalClickedState)
  const [isLimtBarFirstCall, setIsLimtBarFirstCall] = useRecoilState<boolean>(isLimitBarFirstCallState)
  const [firstValueCurrentUsage, setFirstValueCurrentUsage] = useState<number>(0)
  const { isLoading, isError, data: currentUsageInitial } = useQuery({
    queryKey: ["currentUsageInitial"],
    queryFn: () => getFetcher("/api/limit"),
  })
  if(!isLoading && isLimtBarFirstCall){
    if(!isError){
      setFirstValueCurrentUsage(currentUsageInitial?.total)
      setIsLimtBarFirstCall(false)
    }
  }
  return (
    <div className="flex flex-col space-y-4 items-start md:w-[350px] w-full p-4">
      <h1 className="text-lg font-bold">Filter Soal</h1>
      <div className="flex flex-col space-y-2 w-full">
        <p className="text-sm font-medium">Limit Penggunaan</p>
        {isLoading? 
          <Skeleton className="h-4 w-full"/>
          :
          <LimitBar firstValue={firstValueCurrentUsage}/>
        }   
      </div>
      <div className="flex flex-col space-y-2 w-full">
        <p className="text-sm font-medium">Mata Pelajaran</p>
        <FormMataPelajaran/>
        {(isGenerateSoalClicked && mapel === "") ?
          <p className="text-red-600 text-sm">Mapel Tidak Boleh Kosong</p>
          :
          null
        }
      </div>
      <div className="flex flex-row w-full">
        <div className="flex flex-col space-y-2 w-1/2 pr-4">
          <p className="text-sm font-medium">Tingkat Kesulitan</p>
          <FormTingkatKesulitan/>
        </div>
        <div className="flex flex-col space-y-2 w-1/2">
          <p className="text-sm font-medium">Jenis Soal</p>
          <FormJenisSoal/>
        </div>
      </div>
      <div className="flex flex-col space-y-2 w-full">
        <p className="text-sm font-medium">Topik</p>
        <FormTopik/>
      </div>
      <div className="flex flex-col space-y-2 w-full">
        <p className="text-sm font-medium">Jumlah Soal</p>
        <FormJumlahSoal/>
      </div>
      <Button disabled={isGenerating} onClick={onClick} size="lg" className="bg-sky-500 hover:bg-sky-600 w-full">Buat Soal</Button>
    </div>
  )
}

export default FilterForm