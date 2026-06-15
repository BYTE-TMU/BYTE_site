import { useEffect } from 'react'
import type { Announcement } from '../lib/types'

interface Props {
  announcement: Announcement | null
  onClose: () => void
}

export default function AnnouncementModal({ announcement, onClose }: Props) {
  useEffect(() => {
    if (!announcement) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [announcement, onClose])

  if (!announcement) return null

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

        {announcement.imageUrl && (
          <img
            src={announcement.imageUrl}
            alt={announcement.title}
            className="h-52 w-full object-cover"
          />
        )}

        <div className="p-8">
          <p className="mb-3 font-mono text-xs tracking-widest text-accent uppercase">
            {announcement.date}
          </p>
          <h2 className="mb-4 text-2xl font-black tracking-tight text-white leading-tight">
            {announcement.title}
          </h2>
          <p className="text-sm leading-relaxed text-muted">{announcement.body}</p>
        </div>
      </div>
    </div>
  )
}
