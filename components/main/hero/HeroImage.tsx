import Image from "next/image"

const HeroImage = () => {
  return (
    <div className="md:w-1/2 w-0 md:block hidden">
      <Image className="w-full object-center object-contain" src="/hero.png" alt="Hero Book" width={1920} height={1920}/>
    </div>
  )
}

export default HeroImage