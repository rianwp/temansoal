import Hero from "@/components/main/hero/Hero"
import Pricing from "./pricing/Pricing"
import Fitur from "./fitur/Fitur"
import Keunggulan from "./keunggulan/Keunggulan"
import FaQ from "./faq/FaQ"

const Home = () => {
  return (
    <>
      <Hero/>
      <Fitur/>
      <Keunggulan/>
      <FaQ/>
      <Pricing/>
    </>
  )
}

export default Home