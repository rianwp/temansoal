import pilihan from "./pilihan"

type soal = {
  soal: string,
  jawaban: string | pilihan,
  pilihan? : Array<pilihan>,
  pembahasan: string
}

export default soal