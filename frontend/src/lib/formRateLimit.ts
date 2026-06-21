function storageKey(key: string) {
  return `byte_form_last_submit_${key}`
}

export function canSubmit(key: string, windowMs: number): boolean {
  const last = localStorage.getItem(storageKey(key))
  if (!last) return true
  return Date.now() - Number(last) >= windowMs
}

export function recordSubmit(key: string) {
  localStorage.setItem(storageKey(key), String(Date.now()))
}
