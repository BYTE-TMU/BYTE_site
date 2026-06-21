import emailjs from '@emailjs/browser'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const RECIPIENT = 'byte.tmu@gmail.com'

export async function sendEmail(templateId: string, params: Record<string, string>) {
  if (!SERVICE_ID || !PUBLIC_KEY || !templateId) {
    throw new Error('EmailJS is not configured')
  }
  await emailjs.send(SERVICE_ID, templateId, { ...params, to_email: RECIPIENT }, { publicKey: PUBLIC_KEY })
}

// Sends a confirmation email back to the visitor (template routes via {{email}}, not to_email)
export async function sendConfirmation(name: string, email: string) {
  const templateId = import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID
  if (!SERVICE_ID || !PUBLIC_KEY || !templateId) return
  try {
    await emailjs.send(SERVICE_ID, templateId, { name, email }, { publicKey: PUBLIC_KEY })
  } catch {
    // best-effort — the visitor confirmation failing shouldn't block the main submission
  }
}
