import { Progress } from "../ui/progress"

interface LimitBarProps {
  current: number
  limit: number,
}

const LimitBar = ({current, limit}: LimitBarProps) => {
  const progress = current/limit*100
  return (
    <div className="flex flex-row w-full items-center">
      <Progress value={progress} />
      <p className="text-sm font-medium ml-2">{current}/{limit}</p>
    </div>
  )
}

export default LimitBar