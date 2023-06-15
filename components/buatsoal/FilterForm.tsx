"use client"

import { jenisSoalState, mataPelajaranState, tingkatKesulitanState, topikState } from "@/lib/state"
import FormMataPelajaran from "./FormMataPelajaran"
import LimitBar from "./LimitBar"
import { useRecoilValue } from "recoil"
import FormTopik from "./FormTopik"
import FormTingkatKesulitan from "./FormTingkatKesulitan"
import FormJenisSoal from "./FormJenisSoal"
import { Button } from "../ui/button"

const FilterForm = () => {
  const mapel = useRecoilValue<string>(mataPelajaranState)
  const topik = useRecoilValue<string>(topikState)
  const jenisSoal = useRecoilValue<string>(jenisSoalState)
  const tingkatKesulitan = useRecoilValue<string>(tingkatKesulitanState)

  const generateSoal = async () => {
    const dataSoal = {
      mapel,
      topik,
      jenisSoal,
      tingkatKesulitan,
    }
    //nambahin api
  }
  
  return (
    <div className="flex flex-col space-y-4 items-start w-[300px] p-2">
      <h1 className="text-lg text-black font-bold">Filter Soal</h1>
      <div className="flex flex-col space-y-2 w-full">
        <p className="text-sm font-medium">Limit Penggunaan</p>
        <LimitBar limit={15} current={1}/>
      </div>
      <div className="flex flex-col space-y-2 w-full">
        <p className="text-sm font-medium">Mata Pelajaran</p>
        <FormMataPelajaran/>
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
      <Button onClick={generateSoal} size="lg" className="bg-sky-500 hover:bg-sky-600 w-full">Buat Soal</Button>
    </div>
  )
}

export default FilterForm