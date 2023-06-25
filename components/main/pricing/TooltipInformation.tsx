import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { HelpCircle } from "lucide-react"

const TooltipInformation = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <HelpCircle className="w-4 h-4 text-gray-400"/>
        </TooltipTrigger>
        <TooltipContent>
          <p>Limit 20 soal per hari</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default TooltipInformation