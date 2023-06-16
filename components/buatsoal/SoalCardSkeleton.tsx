import { useRecoilValue } from "recoil"
import { Card } from "../ui/card"
import { Skeleton } from "../ui/skeleton"
import { haveOptionsState } from "@/lib/state"



const SoalCardSkeleton = () => {
  const haveOptions = useRecoilValue<boolean>(haveOptionsState)
  return (
    <Card className="w-full p-4">
      <h2 className="flex flex-row items-center">
        <Skeleton className="bg-primary text-sm text-secondary rounded-full flex justify-center items-center h-5 w-5"/>
        <Skeleton className="ml-1 h-6 w-full"/>
      </h2>
      <div className="pl-6 w-full">
        {haveOptions ?
          <div className="flex flex-col space-x-1">
            {[...Array(5)].map((item, index) => (
              <p key={index} className="flex flex-row text-base">
                <Skeleton className="h-6 w-full"></Skeleton>
                <Skeleton className="h-6 w-full"></Skeleton>
              </p>
            ))}
          </div>
          :
          null
        }
        <div className="flex flex-col">
          <Skeleton className="h-6 w-full"></Skeleton>
          <Skeleton className="h-6 w-full"></Skeleton>
        </div>
      </div>
    </Card>
  )
}

export default SoalCardSkeleton