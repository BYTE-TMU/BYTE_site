import { GoogleGenAI } from "@google/genai";
import { readFileSync, writeFileSync } from "fs";
import { createHash } from "crypto";
import { fileURLToPath } from "url";
import path from "path";
import { chunks } from "./chunks.js";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

const MODEL = "gemini-embedding-001";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CACHE_PATH = path.join(__dirname, "vector-cache.json");

/** @type {{ chunk: { id: string, text: string }, embedding: number[] }[]} */
let store = [];

function hashChunks() {
  return createHash("sha256").update(JSON.stringify(chunks)).digest("hex");
}

function loadCache() {
  try {
    return JSON.parse(readFileSync(CACHE_PATH, "utf-8"));
  } catch {
    return null;
  }
}

export async function buildIndex() {
  const hash = hashChunks();
  const cached = loadCache();

  if (cached && cached.hash === hash && cached.model === MODEL) {
    store = cached.entries.map((entry) => ({
      chunk: chunks.find((c) => c.id === entry.id),
      embedding: entry.embedding,
    }));
    console.log(`Vector index loaded from cache: ${store.length} chunks indexed`);
    return;
  }

  const results = await Promise.all(
    chunks.map(async (chunk) => {
      const result = await ai.models.embedContent({
        model: MODEL,
        contents: chunk.text,
      });
      return { chunk, embedding: result.embeddings[0].values };
    })
  );
  store = results;
  console.log(`Vector index built: ${store.length} chunks indexed`);

  try {
    writeFileSync(
      CACHE_PATH,
      JSON.stringify({
        hash,
        model: MODEL,
        entries: results.map((r) => ({ id: r.chunk.id, embedding: r.embedding })),
      })
    );
  } catch (err) {
    console.warn("Could not write embeddings cache:", err.message);
  }
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
