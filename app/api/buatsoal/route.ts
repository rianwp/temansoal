import { openai } from "@/services/openai"
import generateQuestionForm from "@/types/generateQuestionForm"
import { NextResponse } from "next/server"

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is not defined")
}

export const POST = async (req: Request) => {
  const { mapel, tingkatKesulitan, haveOptions = false, topik = "", jumlahSoal = 1 } = (await req.json()) as generateQuestionForm 
  const jumlahSoalPrompt = `berikan ${jumlahSoal} soal ujian`
  const mapelPrompt = `untuk pelajaran ${mapel},`
  const tingkatKesulitanPrompt = `untuk ${tingkatKesulitan},`
  const topikPrompt = `dengan topik terkait: ${topik}`
  const jawabanPrompt = `gunakan format json ${haveOptions ? `[{soal:"soal", pilihan:[{huruf: (a,b,c,d,e), deskripsi: "deskripsi"], jawaban:{huruf: (a,b,c,d,e), deskripsi: "deskripsi"}, pembahasan: "pembahasan"]` : `[{soal:"soal", jawaban:"jawaban", pembahasan: "pembahasan"}]`}.`
  const aturanPrompt = `Jangan tambahkan awalan angka pada setiap soal. Jika terdapat soal cerita yang berhubungan, tuliskan cerita pada setiap soal. Soal cerita minimal 2 paragraf.`
  const bahasaPrompt = `Gunakan referensi kurikulum di Indonesia.`
  const jsonPrompt = `Jangan tambahkan penjelasan apapun, hanya dengan format json. Ikuti format ini tanpa penyimpangan.`
  const prompt = `${jumlahSoalPrompt} ${mapelPrompt} ${tingkatKesulitanPrompt} ${topikPrompt} ${jawabanPrompt} ${aturanPrompt} ${bahasaPrompt} ${jsonPrompt}`

  const temperature = mapel.toLowerCase() === "matematika" ? 0.8 : 0.4

  const completion = await openai.createCompletion({
    model: "gpt-3.5-turbo",
    prompt,
    stream: true,
    temperature,
    max_tokens: 3500,
    frequency_penalty: 0,
    presence_penalty: 0,
    n: 1
  },
  { responseType: "stream"}
  )

  return new NextResponse(JSON.stringify(completion.data))
}