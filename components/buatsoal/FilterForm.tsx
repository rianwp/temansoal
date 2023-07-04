import { currentUsageState, isGenerateSoalClickedState, isGeneratingSoalState, isLimitBarFirstCallState, jumlahSoalState, mataPelajaranState } from "@/lib/state"
import FormMataPelajaran from "./FormMataPelajaran"
import LimitBar from "./LimitBar"
import { useRecoilState, useRecoilValue } from "recoil"
import FormTopik from "./FormTopik"
import FormTingkatKesulitan from "./FormTingkatKesulitan"
import FormJenisSoal from "./FormJenisSoal"
import { Button } from "../ui/button"
import FormJumlahSoal from "./FormJumlahSoal"
import { useState } from "react"
import { Skeleton } from "../ui/skeleton"
import { getFetcher } from "@/lib/fetcher"
import { useQuery } from "@tanstack/react-query"
import { useToast } from "../ui/use-toast"

interface FilterFormProps {
  onClick: () => void
}

const FilterForm = ({onClick}: FilterFormProps) => {
  const { toast } = useToast()
  const mapel = useRecoilValue<string>(mataPelajaranState)
  const jumlahSoal = useRecoilValue<number[]>(jumlahSoalState)
  const isGenerating = useRecoilValue<boolean>(isGeneratingSoalState)
  const currentUsage = useRecoilValue<number>(currentUsageState)
  const isGenerateSoalClicked = useRecoilValue<boolean>(isGenerateSoalClickedState)
  const [isLimtBarFirstCall, setIsLimtBarFirstCall] = useRecoilState<boolean>(isLimitBarFirstCallState)
  const [firstValueCurrentUsage, setFirstValueCurrentUsage] = useState<number>(0)
  const { isLoading, isError, data: currentUsageInitial } = useQuery({
    queryKey: ["currentUsageInitial"],
    queryFn: () => getFetcher("/api/limit"),
  })
  if(!isLoading && isLimtBarFirstCall){
    if(!isError){
      if(currentUsageInitial?.isLimit){
        setFirstValueCurrentUsage(currentUsageInitial?.total)
      }
      setIsLimtBarFirstCall(false)
    }
  }

  const handleClick = () => {
    if(!isGenerating) {
      if(currentUsageInitial?.isLimit){
        if(currentUsageInitial?.total >= 20 || currentUsage >= 20 || currentUsageInitial.total + jumlahSoal[0] > 20 || currentUsage + jumlahSoal[0] > 20){
          toast({
            variant: "default",
            title: "Kamu Mencapai Limit",
            description: "Coba Lagi Besok atau Upgrade ke Premium",
          })
        } else{
          onClick()
        }
      } else{
        onClick()
      }
    }
  }
  return (
    <div className="flex flex-col space-y-4 items-start md:w-[350px] w-full p-4">
      <h1 className="text-lg font-bold">Filter Soal</h1>
      <div className="flex flex-col space-y-2 w-full">
        <p className="text-sm font-medium">Limit Penggunaan</p>
        {isLoading ? 
          <Skeleton className="h-4 w-full"/>
          :
          currentUsageInitial?.isLimit ?
            <LimitBar initialValue={firstValueCurrentUsage}/>
            :
            <p className="font-semibold text-sky-600">Sisa Subscription {currentUsageInitial?.dayLeft} Hari Lagi</p>
        }   
      </div>
      <div className="flex flex-col space-y-2 w-full">
        <p className="text-sm font-medium">Mata Pelajaran</p>
        {isLoading ?
          <Skeleton className="w-full h-14"/>
          :
          <FormMataPelajaran/>
        }
        {(isGenerateSoalClicked && mapel === "") ?
          <p className="text-red-600 text-sm">Mapel Tidak Boleh Kosong</p>
          :
          null
        }
      </div>
      <div className="flex flex-row w-full">
        <div className="flex flex-col space-y-2 w-1/2 pr-4">
          <p className="text-sm font-medium">Tingkat Kesulitan</p>
          {isLoading ?
            <Skeleton className="w-full h-10"/>
            :
            <FormTingkatKesulitan/>
          }
        </div>
        <div className="flex flex-col space-y-2 w-1/2">
          <p className="text-sm font-medium">Jenis Soal</p>
          {isLoading ?
            <Skeleton className="w-full h-10"/>
            :
            <FormJenisSoal/>
          }
        </div>
      </div>
      <div className="flex flex-col space-y-2 w-full">
        <p className="text-sm font-medium">Topik</p>
        {isLoading ?
          <Skeleton className="w-full h-20"/>
          :
          <FormTopik/>
        }
      </div>
      <div className="flex flex-col space-y-2 w-full">
        <p className="text-sm font-medium">Jumlah Soal</p>
        {isLoading ?
          <Skeleton className="w-full h-5"/>
          :
          <FormJumlahSoal/>
        }
      </div>
      {isLoading ?
        <Skeleton className="w-full h-11"/>
        :
        <Button disabled={isGenerating} onClick={handleClick} size="lg" className="bg-sky-500 hover:bg-sky-600 w-full">Buat Soal</Button>
      }
    </div>
  )
}

export default FilterForm