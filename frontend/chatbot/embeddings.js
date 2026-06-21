import { GoogleGenAI } from "@google/genai";
import { chunks } from "./chunks.js";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

/** @type {{ chunk: { id: string, text: string }, embedding: number[] }[]} */
let store = [];

export async function buildIndex() {
  const results = await Promise.all(
    chunks.map(async (chunk) => {
      const result = await ai.models.embedContent({
        model: "gemini-embedding-001",
        contents: chunk.text,
      });
      return { chunk, embedding: result.embeddings[0].values };
    })
  );
  store = results;
  console.log(`Vector index built: ${store.length} chunks indexed`);
}

function cosineSimilarity(a, b) {
  let dot = 0, normA = 0, normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

export async function retrieve(query, topK = 3) {
  const result = await ai.models.embedContent({
    model: "gemini-embedding-001",
    contents: query,
  });
  const queryEmbedding = result.embeddings[0].values;

  return store
    .map(({ chunk, embedding }) => ({
      chunk,
      score: cosineSimilarity(queryEmbedding, embedding),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map(({ chunk }) => chunk.text);
}
