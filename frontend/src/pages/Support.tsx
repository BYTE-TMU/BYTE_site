import { useState } from 'react'

type SubmitState = 'idle' | 'sending' | 'sent' | 'error'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitState, setSubmitState] = useState<SubmitState>('idle')

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitState('sending')
    try {
      await new Promise<void>((_, reject) => setTimeout(reject, 800))
    } catch {
      const mailto = `mailto:hello@byte-tmu.ca?subject=Message from ${encodeURIComponent(form.name)}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`
      window.location.href = mailto
      setSubmitState('sent')
      setTimeout(() => {
        setSubmitState('idle')
        setForm({ name: '', email: '', message: '' })
      }, 4000)
    }
  }

  const buttonLabel: Record<SubmitState, string> = {
    idle: 'Send Message',
    sending: 'Sending...',
    sent: 'Message Sent!',
    error: 'Try Again',
  }

  return (
    <main className="mx-auto max-w-7xl px-6 pt-32 pb-24">
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
              disabled={submitState === 'sending' || submitState === 'sent'}
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
              href="mailto:hello@byte-tmu.ca"
              className="flex items-center gap-3 font-mono text-xs tracking-widest text-muted uppercase transition-colors hover:text-white"
            >
              <span className="text-accent">→</span> hello@byte-tmu.ca
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
