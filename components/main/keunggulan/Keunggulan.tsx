import SectionTitle from "../SectionTitle"
import KeunggulanImage from "./KeunggulanImage"
import KeunggulanList from "./KeunggulanList"

const Keunggulan = () => {
  return (
    <div className="w-full py-20">
      <SectionTitle>Keunggulan</SectionTitle>
      <div className="w-full flex flex-row flex-wrap-reverse justify-center items-end">
        <KeunggulanImage/>
        <KeunggulanList/>
      </div>
    </div>
  )
}

export default Keunggulan