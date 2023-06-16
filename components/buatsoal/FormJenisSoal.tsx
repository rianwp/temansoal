import { haveOptionsState, jenisSoalState } from "@/lib/state"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { useRecoilState } from "recoil"
import { jenisSoal } from "@/lib/data"

const FormJenisSoal = () => {
  const [value, setValue] = useRecoilState<string>(jenisSoalState)
  const [haveOptions, setHaveOptions] = useRecoilState<boolean>(haveOptionsState)
  const valueChange = (currentValue: string) => {
    setValue(currentValue)
    setHaveOptions(currentValue.toLowerCase() === "pilihan ganda")
  }
  return (
    <Select onValueChange={(currentValue) => valueChange(currentValue)}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={value} />
      </SelectTrigger>
      <SelectContent>
        {jenisSoal.map((item, index) => (
          <SelectItem key={index} value={item}>{item}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default FormJenisSoal
