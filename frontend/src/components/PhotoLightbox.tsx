import { useEffect, useRef } from 'react'

export interface AlbumPhoto {
  src: string
  alt: string
  width: number
  height: number
  caption?: string
}

interface Props {
  photos: AlbumPhoto[]
  index: number | null
  onClose: () => void
  onIndexChange: (index: number) => void
}

const SWIPE_THRESHOLD = 50

export default function PhotoLightbox({ photos, index, onClose, onIndexChange }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const touchStartX = useRef<number | null>(null)
  const open = index !== null
  const count = photos.length

  useEffect(() => {
    if (!open) return
    const go = (delta: number) => onIndexChange((index + delta + count) % count)
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft') go(-1)
      else if (e.key === 'ArrowRight') go(1)
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, index, count, onClose, onIndexChange])

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => { document.body.style.overflow = previous }
  }, [open])

  // Warm the cache for the neighbouring photos so arrow/swipe navigation feels instant.
  useEffect(() => {
    if (index === null) return
    for (const delta of [-1, 1]) {
      const img = new Image()
      img.src = photos[(index + delta + count) % count].src
    }
  }, [index, photos, count])

  if (index === null) return null
  const photo = photos[index]

  function go(delta: number) {
    onIndexChange(((index as number) + delta + count) % count)
  }

  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    touchStartX.current = null
    if (Math.abs(dx) > SWIPE_THRESHOLD) go(dx < 0 ? 1 : -1)
  }

  const navButton =
    'absolute top-1/2 z-10 -translate-y-1/2 rounded-full border border-summit-teal/40 bg-summit-navy/70 p-2.5 text-white backdrop-blur transition-colors hover:border-summit-teal hover:text-summit-teal sm:p-3'

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Photo album"
      className="fixed inset-0 z-50 flex items-center justify-center bg-summit-ink/95 px-3 py-14 backdrop-blur sm:px-16"
      onClick={onClose}
      onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX }}
      onTouchEnd={onTouchEnd}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close album"
        className="absolute top-3 right-3 z-10 rounded-full border border-white/20 bg-summit-navy/70 p-2.5 text-white transition-colors hover:border-summit-teal hover:text-summit-teal sm:top-5 sm:right-5"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>

      <button type="button" aria-label="Previous photo" className={`${navButton} left-2 sm:left-5`} onClick={(e) => { e.stopPropagation(); go(-1) }}>
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button type="button" aria-label="Next photo" className={`${navButton} right-2 sm:right-5`} onClick={(e) => { e.stopPropagation(); go(1) }}>
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <figure className="flex max-h-full max-w-full flex-col items-center" onClick={(e) => e.stopPropagation()}>
        <img
          key={photo.src}
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          className="max-h-[78svh] w-auto max-w-full rounded-2xl border border-white/10 object-contain animate-fade-in"
        />
        <figcaption className="mt-4 flex items-center gap-4 font-summit text-xs tracking-widest text-white/70 uppercase">
          <span>{index + 1} / {count}</span>
          {photo.caption && <span className="normal-case tracking-normal text-white/60">{photo.caption}</span>}
        </figcaption>
      </figure>
    </div>
  )
}
