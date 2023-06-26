import Image from "next/image"

const KeunggulanImage = () => {
  return (
    <div className="md:w-1/2 w-full p-4 flex flex-row justify-center items-start aspect-video">
      <div className="relative w-11/12 h-11/12 aspect-video">
        <div className="w-full absolute top-0 left-0 z-10 bg-gradient-to-r from-sky-500 to-emerald-500 aspect-video rounded-lg"/>
        <div className="w-full absolute z-20 top-6 left-6 aspect-video shadow-lg border border-gray-200 rounded-lg overflow-hidden">
          <Image width={1006} height={566} alt="Koleksi Soal" src="/koleksisoal.png" className="w-full object-contain"/>
        </div>
      </div>
    </div>
  )
}

export default KeunggulanImage