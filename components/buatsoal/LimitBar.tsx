import { Progress } from "../ui/progress"

interface LimitBarProps {
  current: number
  limit: number,
}

const LimitBar = ({current, limit}: LimitBarProps) => {
  const progress = current/limit*100
  return (
    <div className="flex flex-row w-full">
      <Progress value={progress} />
      <p className="text-sm font-medium">{current}/{limit}</p>
    </div>
  )
}

export default LimitBar