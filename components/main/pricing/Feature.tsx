import { Check } from "lucide-react"
import { X } from "lucide-react"

interface FeatureProps {
  isChecked: boolean,
  children: React.ReactNode
}

const Feature = ({isChecked, children}: FeatureProps) => {
  return (
    <div className="flex flex-row space-x-1 items-center">
        {isChecked ? 
          <div className="bg-green-300 rounded-full p-0.5">
            <Check className="text-green-500 w-3 h-3"/>
          </div> 
          : 
          <div className="bg-red-300 p-0.5 rounded-full">
            <X className="text-red-500 w-3 h-3"/>
          </div>
        }
        <p className="text-sm">{children}</p>
    </div>
  )
}

export default Feature