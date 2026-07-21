import { useEffect } from 'react'

type SubmitState = 'idle' | 'sending' | 'sent' | 'error' | 'rate-limited'

interface SponsorTier {
  name: string
  price: string
  color: string
  features: { label: string; value: string | boolean }[]
  highlight?: boolean
}

interface RegisterForm {
  name: string
  email: string
  role: string
  tier: string
  message: string
  company: string
}

interface Props {
  open: boolean
  form: RegisterForm
  submitState: SubmitState
  buttonLabel: Record<SubmitState, string>
  tiers: SponsorTier[]
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  onSubmit: (e: React.FormEvent) => void
  onClose: () => void
}

export default function RegisterModal({ open, form, submitState, buttonLabel, tiers, onChange, onSubmit, onClose }: Props) {
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto border border-[#222222] bg-black animate-modal-in"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 font-mono text-xs tracking-widest text-muted hover:text-white transition-colors"
        >
          ESC
        </button>

        <div className="p-8">
          <p className="neon-green-text mb-2 font-mono text-sm tracking-widest uppercase">
            Join Us
          </p>
          <h2 className="mb-8 text-2xl font-black tracking-tight text-white">
            Register Your Interest
          </h2>

          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="company"
              value={form.company}
              onChange={onChange}
              autoComplete="off"
              tabIndex={-1}
              aria-hidden="true"
              className="absolute left-[-9999px] h-0 w-0 opacity-0"
            />
            <div className="flex flex-col gap-1">
              <label htmlFor="summit-name" className="font-mono text-xs tracking-widest text-muted uppercase">
                Your Name
              </label>
              <input
                id="summit-name"
                name="name"
                type="text"
                required
                placeholder="Enter your name"
                value={form.name}
                onChange={onChange}
                className="border border-[#222222] bg-[#111111] px-4 py-3 text-sm text-white placeholder-[#444444] outline-none transition-colors focus:border-accent"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="summit-email" className="font-mono text-xs tracking-widest text-muted uppercase">
                Email Address
              </label>
              <input
                id="summit-email"
                name="email"
                type="email"
                required
                placeholder="Enter your email"
                value={form.email}
                onChange={onChange}
                className="border border-[#222222] bg-[#111111] px-4 py-3 text-sm text-white placeholder-[#444444] outline-none transition-colors focus:border-accent"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="summit-tier" className="font-mono text-xs tracking-widest text-muted uppercase">
                Tier Interested In
              </label>
              <select
                id="summit-tier"
                name="tier"
                value={form.tier}
                onChange={onChange}
                className="border border-[#222222] bg-[#111111] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-accent"
              >
                <option value="">Not sure yet</option>
                {tiers.map(tier => (
                  <option key={tier.name} value={tier.name}>{tier.name}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="summit-message" className="font-mono text-xs tracking-widest text-muted uppercase">
                Message (Optional)
              </label>
              <textarea
                id="summit-message"
                name="message"
                rows={4}
                placeholder="Anything else we should know?"
                value={form.message}
                onChange={onChange}
                className="border border-[#222222] bg-[#111111] px-4 py-3 text-sm text-white placeholder-[#444444] outline-none transition-colors focus:border-accent resize-none"
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
      </div>
    </div>
  )
}
