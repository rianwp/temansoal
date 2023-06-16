import { useRecoilValue } from "recoil"
import { Card } from "../ui/card"
import { Skeleton } from "../ui/skeleton"
import { haveOptionsState } from "@/lib/state"



const SoalCardSkeleton = () => {
  const haveOptions = useRecoilValue<boolean>(haveOptionsState)
  return (
    <Card className="w-full p-4">
      <h2 className="flex flex-row items-center">
        <Skeleton className="rounded-full flex justify-center items-center h-5 w-5"/>
        <Skeleton className="ml-1 h-6 w-full mb-1"/>
      </h2>
      <div className="pl-6 w-full">
        {haveOptions ?
          <div className="flex flex-col space-y-1 mb-2">
            {[...Array(5)].map((item, index) => (
              <p key={index} className="flex flex-row">
                <Skeleton className="h-4 w-10"/>
                <Skeleton className="h-4 w-full"/>
              </p>
            ))}
          </div>
          :
          null
        }
        <div className="flex flex-col">
          <Skeleton className="h-4 w-full mb-1"/>
          <Skeleton className="h-4 w-full"/>
        </div>
      </div>
    </Card>
  )
}

export default SoalCardSkeleton