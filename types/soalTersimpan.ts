import pilihan from "./pilihan"

type soalTersimpan = {
  id?: string,
  soal: string,
  jawaban: string,
  pilihan? : Array<pilihan>,
  pembahasan: string,
  mapel: string
}

export default soalTersimpan