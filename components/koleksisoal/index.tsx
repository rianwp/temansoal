"use client"

import soalTersimpan from "@/types/soalTersimpan"
import SoalTable from "./SoalTable"
import { getFetcher } from "@/lib/fetcher"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { useRecoilState } from "recoil"
import { isKoleksiSoalFirstCallState } from "@/lib/state"


const KoleksiSoal = () => {
  const [firstValueKoleksiSoal, setFirstValueKoleksiSoal] = useState<soalTersimpan[]>([])
  const [isKoleksiSoalFirstCall, setIsKoleksiSoalFirstCall] = useRecoilState<boolean>(isKoleksiSoalFirstCallState)
  const { isLoading, isError, data: koleksiSoalInitial } = useQuery({
    queryKey: ["koleksiSoalInitial"],
    queryFn: () => getFetcher("/api/koleksisoal"),
  })
  if(!isLoading && isKoleksiSoalFirstCall){
    if(!isError){
      setFirstValueKoleksiSoal(koleksiSoalInitial?.soalTersimpan)
      setIsKoleksiSoalFirstCall(false)
    }
  }
  return (
    <div className="p-4 md:px-10 w-full mx-auto">
      <SoalTable initialData={firstValueKoleksiSoal} isDataLoading={isLoading}/>
    </div>
  )
}

export default KoleksiSoal