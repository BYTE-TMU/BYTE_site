const WINDOW_MS = 60_000;
const MAX_REQUESTS = 10;

const requestsByIp = new Map();

export function isRateLimited(ip) {
  const now = Date.now();
  const timestamps = (requestsByIp.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);

  if (timestamps.length >= MAX_REQUESTS) {
    requestsByIp.set(ip, timestamps);
    return true;
  }

  timestamps.push(now);
  requestsByIp.set(ip, timestamps);
  return false;
}
