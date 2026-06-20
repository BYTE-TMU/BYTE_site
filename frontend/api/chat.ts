import { GoogleGenerativeAI } from "@google/generative-ai"
import { BYTE_KB } from "../chatbot/knowledgeBase.js"

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!)

const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction: `You are the BYTE assistant for Toronto Metropolitan University's AI club.
        Answer questions using ONLY the information provided below.
        If something isn't covered, say you're not sure and suggest emailing hello@byte-tmu.ca.
        When sharing a link, always write the full raw URL as plain text (e.g. https://example.com), never use markdown link syntax like [text](url).
        ${BYTE_KB}`,
})

export default async function handler(req: Request) {
  // 1. get the user's message from the request body
  // 2. build a prompt = system context (KB) + user question
  // 3. call Gemini
  // 4. return the answer

  const { message } = await req.json()

  const chat = model.startChat()
  const result = await chat.sendMessage(message)
  const reply = result.response.text()

  return new Response(JSON.stringify({ reply }), {
    headers: { 'Content-Type': 'application/json' },
  })
}