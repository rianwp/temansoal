import { Configuration, OpenAIApi } from "openai-edge"
const configuration = new Configuration({
    organization: "org-xslbDWvBTNfTnpTmWQhokK2j",
    apiKey: process.env.OPENAI_API_KEY,
})

export const openai = new OpenAIApi(configuration)