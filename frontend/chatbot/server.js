import { GoogleGenerativeAI } from "@google/generative-ai";
import { createServer } from "http";
import { config } from "dotenv";
import { BYTE_KB } from "./knowledgeBase.js";

config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  systemInstruction: `You are the BYTE assistant for Toronto Metropolitan University's AI club.
    Answer questions using ONLY the information provided below.
    If something isn't covered, say you're not sure and suggest emailing hello@byte-tmu.ca.
    When sharing a link, always write the full raw URL as plain text (e.g. https://example.com), never use markdown link syntax like [text](url).

    ${BYTE_KB}`,
});

const server = createServer(async (req, res) => {
  if (req.method === "POST" && req.url === "/api/chat") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", async () => {
      const { message } = JSON.parse(body);
      const chat = model.startChat();
      const result = await chat.sendMessage(message);
      const reply = result.response.text();

      res.writeHead(200, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      });
      res.end(JSON.stringify({ reply }));
    });
  }
});

server.listen(3001, () =>
  console.log("API server running on http://localhost:3001"),
);
