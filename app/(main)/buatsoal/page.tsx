"use client"

import FilterForm from "@/components/buatsoal/FilterForm"
import SoalCard from "@/components/buatsoal/SoalCard"
import { Separator } from "@/components/ui/separator"
import { haveOptionsState, isGenerateSoalClickedState, jumlahSoalState, mataPelajaranState, tingkatKesulitanState, topikState } from "@/lib/state"
import { useRecoilState, useRecoilValue } from "recoil"
import { useState } from "react"
import soal from "@/types/soal"
import { useToast } from "@/components/ui/use-toast"
import SoalCardSkeleton from "@/components/buatsoal/SoalCardSkeleton"
import { functions } from "@/services/firebase"
import { HttpsCallableResult, httpsCallable } from "firebase/functions"

const BuatSoalPage = () => {
  const [isGenerateSoalClicked, setIsGenerateSoalClicked] = useRecoilState<boolean>(isGenerateSoalClickedState)
  const mapel = useRecoilValue<string>(mataPelajaranState)
  const jumlahSoal = useRecoilValue<number[]>(jumlahSoalState)
  const haveOptions = useRecoilValue<boolean>(haveOptionsState)
  const tingkatKesulitan = useRecoilValue<string>(tingkatKesulitanState)
  const topik = useRecoilValue<string>(topikState)
  const [soal, setSoal] = useState<soal[]>()
  const { toast } = useToast()
  const [isGenerating, setIsGenarting] = useState<boolean>(false)

  const generateSoal = async () => {
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
        for(const i in [...Array(jumlahSoal[0])]){
          const buatSoal = httpsCallable(functions, "buatsoal")
          const res = await buatSoal(dataInput)
          const dataResult = res.data as { data: soal }
          const dataSoal: soal = dataResult.data
          arraySoal.push(dataSoal)
        }
        setSoal(arraySoal)
        setIsGenerateSoalClicked(false)
        setIsGenarting(false)
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
            />
          ))
        }
        
      </div>
    </div>
  )
}

export default BuatSoalPage