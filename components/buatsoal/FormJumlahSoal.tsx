import { useRecoilState } from "recoil"
import { Slider } from "../ui/slider"
import { jumlahSoalState } from "@/lib/state"

const FormJumlahSoal = () => {
  const [value, setValue] = useRecoilState<number[]>(jumlahSoalState)
  return (
    <div className="flex flex-row w-full items-center">
      <Slider className="h-5" defaultValue={value} min={1} max={5} step={1} onValueChange={(currentValue) => setValue(currentValue)}/>
      <p className="text-sm font-medium ml-2">{value}</p>
    </div>
    
  )
}

export default FormJumlahSoal