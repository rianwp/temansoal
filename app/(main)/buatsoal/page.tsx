"use client"

import FilterForm from "@/components/buatsoal/FilterForm"
import SoalCard from "@/components/buatsoal/SoalCard"
import { Separator } from "@/components/ui/separator"
import { currentUsageState, haveOptionsState, isGenerateSoalClickedState, isGeneratingSoalState, jumlahSoalState, mataPelajaranState, tingkatKesulitanState, topikState } from "@/lib/state"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { useState } from "react"
import soal from "@/types/soal"
import { useToast } from "@/components/ui/use-toast"
import SoalCardSkeleton from "@/components/buatsoal/SoalCardSkeleton"
import { functions } from "@/services/firebase"
import { httpsCallable } from "firebase/functions"
import { postFetcher } from "@/lib/fetcher"
import { useMutation } from "@tanstack/react-query"

const BuatSoalPage = () => {
  const setIsGenerateSoalClicked = useSetRecoilState<boolean>(isGenerateSoalClickedState)
  const mapel = useRecoilValue<string>(mataPelajaranState)
  const jumlahSoal = useRecoilValue<number[]>(jumlahSoalState)
  const haveOptions = useRecoilValue<boolean>(haveOptionsState)
  const tingkatKesulitan = useRecoilValue<string>(tingkatKesulitanState)
  const topik = useRecoilValue<string>(topikState)
  const [soal, setSoal] = useState<soal[]>()
  const { toast } = useToast()
  const [isGenerating, setIsGenarting] = useRecoilState<boolean>(isGeneratingSoalState)
  const setCurrentUsage = useSetRecoilState<number>(currentUsageState)
  
  const { isLoading, isError, data: updateLimit, mutateAsync } = useMutation({
    mutationKey: ["updateLimit"],
    mutationFn: (jumlah: number) =>
      postFetcher("/api/limit", { jumlahSoal: jumlah })
  })

  const generateSoal = async () => {
    const jumlah = jumlahSoal[0]
    setIsGenerateSoalClicked(true)
    const dataInput = {
      mapel,
      haveOptions,
      tingkatKesulitan,
      topik
    }
    
    if(mapel !== ""){
      const arraySoal: Array<soal> = []
      setIsGenarting(true)
      try {
        for(const i in [...Array(jumlah)]){
          const buatSoal = httpsCallable(functions, "buatsoal")
          const res = await buatSoal(dataInput)
          const dataResult = res.data as { data: soal }
          const dataSoal: soal = dataResult.data
          dataSoal.mapel = dataInput.mapel
          arraySoal.push(dataSoal)
        }
        await mutateAsync(jumlah)
        if(!isLoading){
          setCurrentUsage((currVal) => currVal + jumlah)
          setSoal(arraySoal)
          setIsGenerateSoalClicked(false)
          setIsGenarting(false)
          if(isError){
            setIsGenarting(false)
            toast({
              variant: "destructive",
              title: "Terjadi Kesalahan",
            })
          }
        }
      }
      catch (error: any) {
        setIsGenarting(false)
        toast({
          variant: "destructive",
          title: "Terjadi Kesalahan",
          description: error.message,
        })
      }
    }
  }

  return (
    <div className="flex flex-row w-full md:flex-nowrap flex-wrap md:justify-start justify-center">
      <div className="md:fixed flex flex-row w-full md:w-auto">
        <div className="md:screen-height md:w-auto w-full overflow-y-auto">
          <FilterForm onClick={generateSoal}/>
        </div>
        <Separator className="screen-height md:block hidden" orientation="vertical"/>
      </div>
      <div className="w-full p-4 md:ml-[350px] flex flex-col space-y-2">
        {isGenerating ?
          [...Array(jumlahSoal[0])].map((item, index) => (
            <SoalCardSkeleton key={index}/>
          ))
          :
          soal?.map((item, index) => (
            <SoalCard
              key={index}
              jawaban={item.jawaban}
              pilihan={item.pilihan}
              soal={item.soal}
              urutan={index+1}
              pembahasan={item.pembahasan}
              mapel={item.mapel}
            />
          ))
        }
      </div>
    </div>
  )
}

export default BuatSoalPage