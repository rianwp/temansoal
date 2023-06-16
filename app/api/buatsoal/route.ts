import { openai } from "@/services/openai"
import generateQuestionForm from "@/types/generateQuestionForm"
import { ParsedEvent, ReconnectInterval, createParser } from "eventsource-parser"

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
  const jsonPrompt = `Jangan tambahkan penjelasan apapun, hanya dengan bentuk json. Ikuti format ini tanpa penyimpangan.`
  const prompt = `${jumlahSoalPrompt} ${mapelPrompt} ${tingkatKesulitanPrompt} ${topikPrompt} ${jawabanPrompt} ${aturanPrompt} ${bahasaPrompt} ${jsonPrompt}`

  const temperature = mapel.toLowerCase() === "matematika" ? 0.7 : 0.4

  try {
    const payload = {
      model: "gpt-3.5-turbo",
      messages: [{
        role: "user", content: prompt
      }],
      stream: true,
      temperature,
      max_tokens: 3500,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      n: 1
    }

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}`,
      },
      method: "POST",
      body: JSON.stringify(payload),
    })

    const encoder = new TextEncoder()
    const decoder = new TextDecoder()

    let counter = 0;

    const stream = new ReadableStream({
      async start(controller) {
        function onParse(event: ParsedEvent | ReconnectInterval) {
          if (event.type === "event") {
            const data = event.data
            if (data === "[DONE]") {
              controller.close()
              return
            }
            try {
              const json = JSON.parse(data)
              const text = json.choices[0].delta?.content || ""
              if (counter < 2 && (text.match(/\n/) || []).length) {
                return
              }
              const queue = encoder.encode(text);
              controller.enqueue(queue);
              counter++;
              
            } catch (e) {
              controller.error(e)
            }
          }
        }
        const parser = createParser(onParse)
        for await (const chunk of res.body as any) {
          parser.feed(decoder.decode(chunk))
        }
      },
    })
    return new Response(stream, {
      status: 200,
    })
  } catch(error) {
    console.log(error)
    return new Response("Terjadi Kesalahan", {
      status: 500,
    })
  }
}