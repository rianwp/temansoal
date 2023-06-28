import Image from "next/image"

const HeroImage = () => {
  return (
    <div className="md:w-1/2 w-0 md:flex hidden justify-center items-center">
      <Image className="w-11/12 object-center object-contain" src="/hero.png" alt="Hero Book" width={1920} height={1920}/>
    </div>
  )
}

export default HeroImage