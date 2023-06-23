import soalTersimpan from "@/types/soalTersimpan"

const SoalPopup = ({soal, jawaban, pilihan, pembahasan, mapel}: soalTersimpan) => {
  return (
    <div className="w-full">
      <p className="text-base mb-1">Soal {mapel}</p>
      <p className="text-base font-semibold">{soal}</p>
      <div className="w-full mt-4">
        {pilihan ?
          <div className="flex flex-col space-y-1">
            {pilihan.map((item, index) => (
              <p key={index} className="flex flex-row items-center text-base space-x-1">
                <p className="font-semibold">{item.huruf}.</p>
                <p className="font-normal">{item.deskripsi}</p>
              </p>
            ))}
          </div>
          :
          null
        }
        <div className="flex flex-col">
          <div className="flex flex-row items-start space-x-2">
            <p className="font-normal text-base">Jawaban: </p>
            <p className="font-semibold text-sky-600">{jawaban}</p>
          </div>
          <div className="flex flex-row items-start space-x-2">
            <p className="font-normal text-base">Pembahasan: </p>
            <p className="font-normal text-base">{pembahasan}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SoalPopup