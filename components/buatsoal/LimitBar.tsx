import { Progress } from "../ui/progress"
import { useRecoilState } from "recoil"
import { currentUsageState } from "@/lib/state"

interface LimitBarProps {
  firstValue: number
}

const LimitBar = ({firstValue}: LimitBarProps) => {
  const [currentUsage, setCurrentUsage] = useRecoilState<number>(currentUsageState)
  if(currentUsage === 0){
    setCurrentUsage(firstValue)
  }
  const limit = 20
  const progress =  currentUsage/limit*100
  return (
    <div className="flex flex-row w-full items-center">
      <Progress value={progress} />
      <p className="text-sm font-medium ml-2">{currentUsage}/{limit}</p>
    </div>
  )
}

export default LimitBar