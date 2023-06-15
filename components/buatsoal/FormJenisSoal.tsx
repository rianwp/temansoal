import { jenisSoalState } from "@/lib/state"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { useRecoilState } from "recoil"
import { jenisSoal } from "@/lib/data"

const FormJenisSoal = () => {
  const [value, setValue] = useRecoilState<string>(jenisSoalState)
  return (
    <Select onValueChange={(currentValue) => setValue(currentValue)}>
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
