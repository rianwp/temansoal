import Image from "next/image"

const KeunggulanImage = () => {
  return (
    <div className="md:w-1/2 w-full p-4 flex flex-row justify-center items-start aspect-video">
      <div className="relative w-11/12 h-11/12 aspect-video">
        <div className="w-full absolute md:top-0 md:left-0 -top-3 -left-3 z-10 bg-gradient-to-r from-sky-500 to-emerald-500 aspect-video rounded-lg"/>
        <div className="w-full absolute z-20 md:top-6 md:left-6 top-3 left-3 aspect-video shadow-lg border border-gray-200 rounded-lg overflow-hidden bg-gray-200">
          <Image width={1270} height={714} alt="Koleksi Soal" src="/koleksisoal.png" className="w-full object-contain"/>
        </div>
      </div>
    </div>
  )
}

export default KeunggulanImage