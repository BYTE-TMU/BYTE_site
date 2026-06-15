import { useEffect } from 'react'
import type { Event } from '../lib/types'

interface Props {
  event: Event | null
  onClose: () => void
}

export default function EventModal({ event, onClose }: Props) {
  useEffect(() => {
    if (!event) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [event, onClose])

  if (!event) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg border border-[#222222] bg-black overflow-hidden animate-modal-in"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 font-mono text-xs tracking-widest text-muted hover:text-white transition-colors"
        >
          ESC
        </button>

        {event.imageUrl && (
          <img
            src={event.imageUrl}
            alt={event.title}
            className="h-52 w-full object-cover"
          />
        )}

        <div className="p-8">
          <div className="mb-4 flex items-center gap-3">
            <span className="font-mono text-xs tracking-widest text-accent uppercase">
              {event.category}
            </span>
            <span className="text-[#333333]">·</span>
            <span className="font-mono text-xs tracking-widest text-muted uppercase">
              {event.date}
            </span>
          </div>

          <h2 className="mb-6 text-2xl font-black tracking-tight text-white leading-tight">
            {event.title}
          </h2>

          <div className="mb-6 flex flex-col gap-3">
            {event.location && (
              <div className="flex items-start gap-3">
                <span className="font-mono text-xs tracking-widest text-muted uppercase w-20 shrink-0 pt-0.5">Location</span>
                <span className="text-sm text-white">{event.location}</span>
              </div>
            )}
            {event.timing && (
              <div className="flex items-start gap-3">
                <span className="font-mono text-xs tracking-widest text-muted uppercase w-20 shrink-0 pt-0.5">Time</span>
                <span className="text-sm text-white">{event.timing}</span>
              </div>
            )}
            {event.coHosts && event.coHosts.length > 0 && (
              <div className="flex items-start gap-3">
                <span className="font-mono text-xs tracking-widest text-muted uppercase w-20 shrink-0 pt-0.5">Co-hosts</span>
                <span className="text-sm text-white">{event.coHosts.join(', ')}</span>
              </div>
            )}
          </div>

          <p className="mb-6 text-sm leading-relaxed text-muted">{event.description}</p>

          {event.registrationUrl && (
            <a
              href={event.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-accent px-5 py-2 font-mono text-xs tracking-widest text-accent uppercase transition-colors hover:bg-accent hover:text-black"
            >
              Register →
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
