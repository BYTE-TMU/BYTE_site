import { useState } from 'react'
import { sendEmail, sendConfirmation } from '../lib/emailjs'
import { canSubmit, recordSubmit } from '../lib/formRateLimit'

type SubmitState = 'idle' | 'sending' | 'sent' | 'error' | 'rate-limited'

const RATE_LIMIT_MS = 30_000

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '', company: '' })
  const [submitState, setSubmitState] = useState<SubmitState>('idle')

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (form.company) return // honeypot triggered, silently drop

    if (!canSubmit('contact-form', RATE_LIMIT_MS)) {
      setSubmitState('rate-limited')
      setTimeout(() => setSubmitState('idle'), 4000)
      return
    }

    setSubmitState('sending')
    try {
      await sendEmail(import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID, {
        name: form.name,
        email: form.email,
        message: form.message,
        role: '',
        tier: '',
        reply_to: form.email,
      })
      recordSubmit('contact-form')
      sendConfirmation(form.name, form.email)
      setSubmitState('sent')
      setTimeout(() => {
        setSubmitState('idle')
        setForm({ name: '', email: '', message: '', company: '' })
      }, 4000)
    } catch {
      setSubmitState('error')
    }
  }

  const buttonLabel: Record<SubmitState, string> = {
    idle: 'Send Message',
    sending: 'Sending...',
    sent: 'Message Sent!',
    error: 'Try Again',
    'rate-limited': 'Please Wait...',
  }

  return (
    <main className="mx-auto max-w-7xl px-6 pt-40 pb-24">
      <div className="mb-12">
        <p className="mb-2 font-mono text-xs tracking-widest text-accent uppercase">Get in Touch</p>
        <h1 className="text-5xl font-black tracking-tight md:text-7xl">Contact</h1>
        <p className="mt-4 text-lg text-muted">
          Anything from project support to general inquiry, let us know.
        </p>
      </div>

      <div className="grid gap-16 md:grid-cols-2">
        {/* Form */}
        <div>
          <p className="mb-6 font-mono text-xs tracking-widest text-accent uppercase">Send a Message</p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="company"
              value={form.company}
              onChange={handleChange}
              autoComplete="off"
              tabIndex={-1}
              aria-hidden="true"
              className="absolute left-[-9999px] h-0 w-0 opacity-0"
            />
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="font-mono text-xs tracking-widest text-muted uppercase">
                Your Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Enter your name"
                value={form.name}
                onChange={handleChange}
                className="border border-[#222222] bg-surface px-4 py-3 text-sm text-white placeholder-[#444444] outline-none transition-colors focus:border-accent"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="font-mono text-xs tracking-widest text-muted uppercase">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                className="border border-[#222222] bg-surface px-4 py-3 text-sm text-white placeholder-[#444444] outline-none transition-colors focus:border-accent"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="message" className="font-mono text-xs tracking-widest text-muted uppercase">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="Tell us about your project or question..."
                value={form.message}
                onChange={handleChange}
                className="border border-[#222222] bg-surface px-4 py-3 text-sm text-white placeholder-[#444444] outline-none transition-colors focus:border-accent resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={submitState === 'sending' || submitState === 'sent' || submitState === 'rate-limited'}
              className={`self-start border px-6 py-3 font-mono text-xs tracking-widest uppercase transition-colors disabled:cursor-not-allowed ${
                submitState === 'sent'
                  ? 'border-accent text-accent'
                  : 'border-white text-white hover:border-accent hover:text-accent'
              }`}
            >
              {buttonLabel[submitState]}
            </button>
          </form>
        </div>

        {/* Connect */}
        <div>
          <p className="mb-6 font-mono text-xs tracking-widest text-accent uppercase">Connect With Us</p>
          <p className="mb-8 text-sm leading-relaxed text-muted">
            Join Toronto Metropolitan University's premier AI innovation lab. Whether you're interested
            in contributing to our projects, attending events, or just want to learn more about what
            we do, we'd love to connect with you.
          </p>
          <div className="flex flex-col gap-4">
            <a
              href="mailto:byte.tmu@gmail.com"
              className="flex items-center gap-3 font-mono text-xs tracking-widest text-muted uppercase transition-colors hover:text-white"
            >
              <span className="text-accent">→</span> byte.tmu@gmail.com
            </a>
            <a
              href="https://discord.gg/6Xxyk9u4uU"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 font-mono text-xs tracking-widest text-muted uppercase transition-colors hover:text-white"
            >
              <span className="text-accent">→</span> Discord
            </a>
            <a
              href="https://www.instagram.com/tmu.byte/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 font-mono text-xs tracking-widest text-muted uppercase transition-colors hover:text-white"
            >
              <span className="text-accent">→</span> Instagram
            </a>
            <a
              href="https://linktr.ee/BYTETMU"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 font-mono text-xs tracking-widest text-muted uppercase transition-colors hover:text-white"
            >
              <span className="text-accent">→</span> Linktree
            </a>
          </div>
          <div className="mt-10 flex flex-col gap-2">
            <p className="font-mono text-xs tracking-widest text-[#333333] uppercase">Always accepting new members</p>
            <p className="font-mono text-xs tracking-widest text-[#333333] uppercase">Join our community of AI innovators</p>
          </div>
        </div>
      </div>
    </main>
  )
}
