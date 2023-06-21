import { OpenAIStreamMine } from "@/utils/openaistream"
import { openai } from "@/services/openai"
import generateQuestionForm from "@/types/generateQuestionForm"
import { OpenAIStream, StreamingTextResponse } from "ai"
import { NextResponse } from "next/server"

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is not defined")
}

export const runtime = "edge"

export const POST = async (req: Request) => {
  const { mapel, tingkatKesulitan, haveOptions = false, topik = "", jumlahSoal = 1 } = (await req.json()) as generateQuestionForm 
  const jumlahSoalPrompt = `berikan ${jumlahSoal} soal ujian`
  const mapelPrompt = `untuk pelajaran ${mapel},`
  const tingkatKesulitanPrompt = `untuk ${tingkatKesulitan},`
  const topikPrompt = `dengan topik terkait: ${topik}`
  const jawabanPrompt = `gunakan format json ${haveOptions ? `{soal:"soal", pilihan:["A,B,C,D,E"], jawaban:"A.jawaban"}` : `{soal:"soal", jawaban:"jawaban"}`}.`
  const aturanPrompt = `${haveOptions ? "pilihan dan jawaban harus menyertakan huruf(A,B,C,D,E) dalam huruf kapital" : ""}. Jangan tambahkan awalan angka pada setiap soal. Jika terdapat soal cerita yang berhubungan, tuliskan cerita pada setiap soal. Soal cerita minimal 1 paragraf. Berikan soal singkat untuk matematika.`
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
    return NextResponse.json({ 
      success: false,
      message: "Terjadi Kesalahan"
    }, {
      status: 500,
    })
  }
}

// import { onRequest } from "firebase-functions/v2/https"
// import { OpenAIStream, StreamingTextResponse } from "ai"
// import { Configuration, OpenAIApi } from "openai-edge"


// const configuration = new Configuration({
//   organization: "org-xslbDWvBTNfTnpTmWQhokK2j",
//   apiKey: process.env.OPENAI_API_KEY,
// })

// const openai = new OpenAIApi(configuration)

// type generateQuestionForm = {
//   mapel: string,
//   tingkatKesulitan: string,
//   haveOptions: boolean,
//   topik: string,
//   jumlahSoal: number
// }

// export const buatsoal = onRequest(async (req, res) => {
//   const { mapel, tingkatKesulitan, haveOptions = false, topik = "", jumlahSoal = 1 } = req.body as generateQuestionForm
//   const jumlahSoalPrompt = `berikan ${jumlahSoal} soal ujian`
//   const mapelPrompt = `untuk pelajaran ${mapel},`
//   const tingkatKesulitanPrompt = `untuk ${tingkatKesulitan},`
//   const topikPrompt = `dengan topik terkait: ${topik}`
//   const jawabanPrompt = `gunakan format json ${haveOptions ? `{soal:"soal", pilihan:["A,B,C,D,E"], jawaban:"A.jawaban"}` : `{soal:"soal", jawaban:"jawaban"}`}.`
//   const aturanPrompt = `${haveOptions ? "pilihan dan jawaban harus menyertakan huruf(A,B,C,D,E) dalam huruf kapital" : ""}. Jangan tambahkan awalan angka pada setiap soal. Jika terdapat soal cerita yang berhubungan, tuliskan cerita pada setiap soal. Soal cerita minimal 1 paragraf. Berikan soal singkat untuk matematika.`
//   const bahasaPrompt = `Gunakan referensi kurikulum di Indonesia.`
//   const jsonPrompt = `Jangan tambahkan penjelasan apapun, hanya dengan bentuk json. Ikuti format ini tanpa penyimpangan.`
//   const prompt = `${jumlahSoalPrompt} ${mapelPrompt} ${tingkatKesulitanPrompt} ${topikPrompt} ${jawabanPrompt} ${aturanPrompt} ${bahasaPrompt} ${jsonPrompt}`

//   const temperature = mapel.toLowerCase() === "matematika" ? 0.5 : 0.4
//   try {
//     const completion = await openai.createChatCompletion({
//       model: "gpt-3.5-turbo",
//       messages: [{
//         role: "user", content: prompt
//       }],
//       stream: true,
//       temperature,
//       max_tokens: 1000,
//       top_p: 1,
//       frequency_penalty: 0,
//       presence_penalty: 0,
//       n: 1
//     })
//     const stream = OpenAIStream(completion)
//     res.status(200).send(new StreamingTextResponse(stream))
//   } catch(error) {
//     res.status(500).send("Terjadi Kesalahan")
//   }
// })