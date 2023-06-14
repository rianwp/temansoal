import HeroText from "./HeroText"

const Hero = () => {
  return (
    <div className="w-full landscape:h-screen hero-responsive bg-gradient-to-r from-blue-600 via-sky-500 to-emerald-400 -mt-16 pt-16 flex flex-col justify-center p-3 lg:px-10">
      <HeroText/>
    </div>
  )
}

export default Hero