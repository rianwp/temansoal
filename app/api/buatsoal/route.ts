import { OpenAIStreamMine } from "@/lib/openaistream"
import { openai } from "@/services/openai"
import generateQuestionForm from "@/types/generateQuestionForm"
import { OpenAIStream, StreamingTextResponse } from "ai"

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is not defined")
}

export const POST = async (req: Request) => {
  const { mapel, tingkatKesulitan, haveOptions = false, topik = "", jumlahSoal = 1 } = (await req.json()) as generateQuestionForm 
  const jumlahSoalPrompt = `berikan ${jumlahSoal} soal ujian`
  const mapelPrompt = `untuk pelajaran ${mapel},`
  const tingkatKesulitanPrompt = `untuk ${tingkatKesulitan},`
  const topikPrompt = `dengan topik terkait: ${topik}`
  const jawabanPrompt = `gunakan format json ${haveOptions ? `{soal:"soal", pilihan:[(a,b,c,d,e dalam huruf kapital)], jawaban:{(a,b,c,d,e dalam huruf kapital dan tanpa keterangan)}, pembahasan: "pembahasan singkat"` : `{soal:"soal", jawaban:"jawaban", pembahasan: "pembahasan singkat"}`}.`
  const aturanPrompt = `Jangan tambahkan awalan angka pada setiap soal. Jika terdapat soal cerita yang berhubungan, tuliskan cerita pada setiap soal. Soal cerita minimal 1 paragraf. Berikan soal singkat untuk matematika.`
  const bahasaPrompt = `Gunakan referensi kurikulum di Indonesia.`
  const jsonPrompt = `Jangan tambahkan penjelasan apapun, hanya dengan bentuk json. Ikuti format ini tanpa penyimpangan.`
  const prompt = `${jumlahSoalPrompt} ${mapelPrompt} ${tingkatKesulitanPrompt} ${topikPrompt} ${jawabanPrompt} ${aturanPrompt} ${bahasaPrompt} ${jsonPrompt}`

  const temperature = mapel.toLowerCase() === "matematika" ? 0.5 : 0.4

  try {
    const res = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{
        role: "user", content: prompt
      }],
      stream: true,
      temperature,
      max_tokens: 1000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      n: 1
    })
    
    const stream = OpenAIStream(res)
    return new StreamingTextResponse(stream, {
      status: 200
    })
    // const stream = await OpenAIStreamMine(res)
    // return new Response(stream, {
    //   status: 200
    // })
  } catch(error) {
    console.log(error)
    return new Response("Terjadi Kesalahan", {
      status: 500,
    })
  }
}