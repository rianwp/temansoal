import { mataPelajaranState, topikState } from "@/lib/state"
import { Textarea } from "../ui/textarea"
import { useRecoilState, useRecoilValue } from "recoil"
import { mataPelajaran } from "@/lib/data"

const FormTopik = () => {
  const [value, setValue] = useRecoilState<string>(topikState)
  const mapelValue = useRecoilValue(mataPelajaranState)
  const topikArray = mataPelajaran.find((mapel) => mapel.nama.toLowerCase() === mapelValue)?.subTopik
  const topik =  topikArray?.map((topik) => {
    return ` ${topik}`
  })
  return (
    <Textarea value={value} className="w-full h-20" placeholder={`${topik ? `Topik seperti: ${topik}` : "Seperti: kata kunci, bab, materi, dll"}`} onChange={(e) => setValue(e.target.value)}/>
  )
}

export default FormTopik