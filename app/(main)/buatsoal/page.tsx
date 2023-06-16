"use client"

import FilterForm from "@/components/buatsoal/FilterForm"
import SoalCard from "@/components/buatsoal/SoalCard"
import { Separator } from "@/components/ui/separator"
import { isGenerateSoalClickedState } from "@/lib/state"
import { useRecoilState } from "recoil"

const BuatSoalPage = () => {
  const [isGenerateSoalClicked, setIsGenerateSoalClicked] = useRecoilState<boolean>(isGenerateSoalClickedState)
  const generateSoal = async () => {

  }

  return (
    <div className="flex flex-row w-full md:flex-nowrap flex-wrap md:justify-start justify-center">
      <div className="md:fixed flex flex-row w-full md:w-auto">
        <div className="screen-height md:w-auto w-full overflow-y-auto">
          <FilterForm onClick={generateSoal}/>
        </div>
        <Separator className="screen-height md:block hidden" orientation="vertical"/>
      </div>
      <div className="w-full p-4 md:ml-[350px]">
        <SoalCard
          jawaban="Jawaban A adalah B"
          soal="Berapa jumlah pria yang ada disitu"
          urutan={1}
          pembahasan=""
        />
      </div>
    </div>
  )
}

export default BuatSoalPage