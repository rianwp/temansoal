import HeroMainButton from "./HeroMainButton"
import HeroText from "./HeroText"
import HeroCounter from "./HeroCounter"
import HeroImage from "./HeroImage"
import OpenaiLogo from "./OpenaiLogo"

const Hero = () => {
  return (
    <div className="w-full landscape:min-h-screen hero-responsive bg-gradient-to-r from-blue-600 via-sky-500 to-emerald-400 -mt-16 pt-16 flex flex-row justify-center md:justify-start items-center p-3 md:px-10">
      <div className="md:w-1/2 w-full flex flex-col md:items-start items-center">
        <HeroText/>
        <HeroCounter/>
        <div className="flex md:flex-row mt-10 md:space-x-3 flex-col space-y-3 md:space-y-0 items-center">
          <HeroMainButton/>
          <OpenaiLogo/>
        </div>
      </div>
      <HeroImage/>
    </div>
  )
}

export default Hero