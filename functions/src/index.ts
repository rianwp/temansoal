import { onRequest } from "firebase-functions/v2/https"
import { Configuration, OpenAIApi } from "openai"

import * as cors from "cors"

const corsHandler = cors({ origin: true })

const configuration = new Configuration({
  organization: "org-xslbDWvBTNfTnpTmWQhokK2j",
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

type generateQuestionForm = {
  mapel: string,
  tingkatKesulitan: string,
  haveOptions: boolean,
  topik: string,
  jumlahSoal: number
}

export const buatsoal = onRequest(async (request, response) => {
  corsHandler(request, response, async () => {
    const { mapel, tingkatKesulitan, haveOptions = false, topik = "", jumlahSoal = 1 } = request.body as generateQuestionForm
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
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{
          role: "user", content: prompt
        }],
        stream: false,
        temperature,
        max_tokens: 1000,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        n: 1
      })
      response.status(200).send(completion.data)
    } catch(error) {
      response.status(500).send("Terjadi Kesalahan")
    }
  })
})
