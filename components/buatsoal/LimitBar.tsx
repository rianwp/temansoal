import { Progress } from "../ui/progress"
import { useRecoilState } from "recoil"
import { currentUsageState } from "@/lib/state"

interface LimitBarProps {
  initialValue: number
}

const LimitBar = ({initialValue}: LimitBarProps) => {
  const [currentUsage, setCurrentUsage] = useRecoilState<number>(currentUsageState)
  if(currentUsage === 0){
    setCurrentUsage(initialValue)
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