import { useRecoilValue } from "recoil"
import { Card } from "../ui/card"
import { Skeleton } from "../ui/skeleton"
import { haveOptionsState } from "@/lib/state"
import { motion } from "framer-motion"

const SoalCardSkeleton = () => {
  const animate = {
    initial: { opacity: 0, y: -20, scale: 0.5},
    in: { opacity: 1, y: 0, scale: 1}
  }
  const haveOptions = useRecoilValue<boolean>(haveOptionsState)
  return (
    <motion.div variants={animate} animate="in" initial="initial">
      <Card className="w-full p-4">
        <h2 className="flex flex-row items-start">
          <Skeleton className="rounded-full flex justify-center shrink-0 items-center h-5 w-5"/>
          <Skeleton className="ml-2 h-4 w-36 mb-2"/>
        </h2>
        <div className="pl-6 w-full">
          {haveOptions ?
            <div className="flex flex-col space-y-2.5 mb-2">
              {[...Array(5)].map((item, index) => (
                <p key={index} className="flex flex-row">
                  <Skeleton className="h-4 w-4"/>
                  <Skeleton className="ml-2 h-4 w-full"/>
                </p>
              ))}
            </div>
            :
            null
          }
          <div className="flex flex-col">
            <Skeleton className="h-4 w-full"/>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

export default SoalCardSkeleton