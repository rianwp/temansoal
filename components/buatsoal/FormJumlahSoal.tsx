import { useRecoilState, useRecoilValue } from "recoil"
import { Slider } from "../ui/slider"
import { isGeneratingSoalState, jumlahSoalState } from "@/lib/state"

const FormJumlahSoal = () => {
  const [value, setValue] = useRecoilState<number[]>(jumlahSoalState)
  const isGenerating = useRecoilValue<boolean>(isGeneratingSoalState)
  return (
    <div className="flex flex-row w-full items-center">
      <Slider disabled={isGenerating} className="h-5" defaultValue={value} min={1} max={5} step={1} onValueChange={(currentValue) => setValue(currentValue)}/>
      <p className="text-sm font-medium ml-2">{value}</p>
    </div>
  )
}

export default FormJumlahSoal