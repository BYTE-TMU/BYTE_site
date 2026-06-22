import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const chunks = JSON.parse(
  readFileSync(path.join(__dirname, "knowledgebase.json"), "utf-8")
);
