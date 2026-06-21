import { GoogleGenAI } from "@google/genai";
import { buildIndex, retrieve } from "./embeddings.js";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY! });

const SYSTEM_INSTRUCTION = `You are the BYTE assistant for Toronto Metropolitan University's AI club.
    Answer questions using ONLY the context provided with each message.
    If something isn't covered in the context, say you're not sure and suggest emailing hello@byte-tmu.ca.
    When sharing a link, always write the full raw URL as plain text (e.g. https://example.com), never use markdown link syntax like [text](url).`;

await buildIndex();

export default async function handler(req: Request) {
  const { message } = await req.json();

  const relevantChunks = await retrieve(message);
  const context = relevantChunks.join("\n\n---\n\n");

  const chat = ai.chats.create({
    model: "gemini-2.5-flash",
    config: { systemInstruction: SYSTEM_INSTRUCTION },
  });
  const result = await chat.sendMessage({
    message: `Context:\n${context}\n\nQuestion: ${message}`,
  });
  const reply = result.text;

  return new Response(JSON.stringify({ reply }), {
    headers: { "Content-Type": "application/json" },
  });
}
