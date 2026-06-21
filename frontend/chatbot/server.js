import { GoogleGenAI } from "@google/genai";
import { createServer } from "http";
import { buildIndex, retrieve } from "./embeddings.js";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

const SYSTEM_INSTRUCTION = `You are the BYTE assistant for Toronto Metropolitan University's AI club.
    Answer questions using ONLY the context provided with each message.
    If something isn't covered in the context, say you're not sure and suggest emailing hello@byte-tmu.ca.
    When sharing a link, always write the full raw URL as plain text (e.g. https://example.com), never use markdown link syntax like [text](url).`;

await buildIndex();

const server = createServer(async (req, res) => {
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
    });
    res.end();
    return;
  }

  if (req.method === "POST" && req.url === "/api/chat") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", async () => {
      try {
        const { message } = JSON.parse(body);

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

        res.writeHead(200, {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        });
        res.end(JSON.stringify({ reply }));
      } catch (err) {
        console.error(err);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ reply: "Something went wrong. Please try again." }));
      }
    });
  }
});

server.listen(3001, () =>
  console.log("RAG server running on http://localhost:3001")
);
