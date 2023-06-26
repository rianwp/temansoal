import { Edit3 } from "lucide-react"
import SectionTitle from "../SectionTitle"
import FiturImage from "./FiturImage"
import FiturList from "./FiturList"

const Fitur = () => {
  return (
    <div className="w-full py-20">
      <SectionTitle>Fitur</SectionTitle>
      <div className="w-full flex flex-row flex-wrap-reverse justify-center items-end">
        <FiturImage/>
        <FiturList/>
      </div>
    </div>
  )
}

export default Fitur