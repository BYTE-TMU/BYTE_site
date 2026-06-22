const MAX_MESSAGES = 12;
const MAX_MESSAGE_CHARS = 2000;
const MAX_TOTAL_CHARS = 4000;

export function sanitizeHistory(history) {
  if (!Array.isArray(history)) return [];

  const recent = history.slice(-MAX_MESSAGES);
  const result = [];
  let budget = MAX_TOTAL_CHARS;

  for (let i = recent.length - 1; i >= 0; i--) {
    const m = recent[i];
    if (typeof m?.content !== "string" || typeof m?.role !== "string") continue;

    const content = m.content.slice(0, MAX_MESSAGE_CHARS);
    budget -= content.length;
    if (budget < 0) break;

    result.unshift({ role: m.role, content });
  }

  return result;
}
