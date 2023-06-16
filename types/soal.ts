import jawaban from "./jawaban";
import pilihan from "./pilihan";

type soal = {
  soal: string,
  jawaban: jawaban | string,
  pilihan? : pilihan,
  pembahasan: string
}

export default soal