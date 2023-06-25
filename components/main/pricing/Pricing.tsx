import SectionTitle from "../SectionTitle"
import PricingFree from "./PricingFree"
import PricingPremium from "./PricingPremium"

const Pricing = () => {
  return (
    <div className="w-full py-20">
      <SectionTitle>Pricing</SectionTitle>
      <div className="lg:w-2/3 w-full flex flex-row flex-wrap justify-center items-center mx-auto">
        <PricingFree/>
        <PricingPremium/>
      </div>
    </div>
  )
}

export default Pricing