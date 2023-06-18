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
    const data = {
      mapel,
      jumlahSoal: 1,
      haveOptions,
      tingkatKesulitan,
      topik
    }
    if(mapel !== ""){
      setIsGenarting(true)
      try {
        const array: soal[] = []
        for (const jumlah of [...Array(jumlahSoal[0])]){
          const res = await fetch(`https://buatsoal-e36crbbj6a-uc.a.run.app`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
          })
          
          const json: soal = await res.json()
          if(res.status === 200){
            array.push(json)
          } else{
            setIsGenarting(false)
            toast({
              variant: "destructive",
              title: "Terjadi Kesalahan",
              description: "Terdapat masalah pada server",
            })
          }
        }
        setSoal(array)
        setIsGenerateSoalClicked(false)
        setIsGenarting(false)
        console.log(soal)
      }
      catch (error) {
        console.log(error)
        setIsGenarting(false)
        toast({
          variant: "destructive",
          title: "Terjadi Kesalahan",
          description: "Terdapat masalah pada server",
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
              // pembahasan={item.pembahasan}
            />
          ))
        }
        
      </div>
    </div>
  )
}

export default BuatSoalPage