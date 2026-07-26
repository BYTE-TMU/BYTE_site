import { useEffect, useRef, useState } from 'react'

const SEEN_KEY = 'byte-intro-seen'
const FADE_MS = 600
/* Hard cap so a stalled download can never trap someone on the overlay (video runs ~19s). */
const SAFETY_MS = 30000

/* Safari private mode has historically thrown on storage access — a throw inside the
   useState initializer below would take the whole site down, so both sides are guarded. */
function hasSeenIntro() {
  try {
    return sessionStorage.getItem(SEEN_KEY) === '1'
  } catch {
    return false
  }
}

function markIntroSeen() {
  try {
    sessionStorage.setItem(SEEN_KEY, '1')
  } catch {
    /* no-op */
  }
}

interface IntroVideoProps {
  onFinish: () => void
}

export default function IntroVideo({ onFinish }: IntroVideoProps) {
  // Decided once, on mount, so navigating back to "/" later in the session can't retrigger it.
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return false
    if (window.location.pathname !== '/') return false
    if (hasSeenIntro()) return false
    // A 19s autoplaying video is exactly what this setting exists to suppress.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
    return true
  })
  const [fading, setFading] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const skipRef = useRef<HTMLButtonElement>(null)
  const dismissedRef = useRef(false)
  const onFinishRef = useRef(onFinish)
  onFinishRef.current = onFinish

  const dismissRef = useRef<() => void>(() => {})
  dismissRef.current = () => {
    if (dismissedRef.current) return
    dismissedRef.current = true
    // Fires while the overlay is still fully opaque, so the homepage remount it triggers
    // is hidden — the fade then reveals those entrance animations already in motion.
    onFinishRef.current()
    setFading(true)
    setTimeout(() => setVisible(false), FADE_MS)
  }

  useEffect(() => {
    if (!visible) return
    markIntroSeen()

    const dismiss = () => dismissRef.current()
    const video = videoRef.current

    if (video) {
      // Set muted on the element itself, not just via the prop: React doesn't reliably
      // reflect it to the DOM property in time, and an unmuted play() is always rejected.
      video.muted = true
      video.play().catch(dismiss) // iOS Low Power Mode blocks autoplay outright
    }

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismiss()
    }
    window.addEventListener('keydown', onKeyDown)

    skipRef.current?.focus()
    const safety = setTimeout(dismiss, SAFETY_MS)

    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKeyDown)
      clearTimeout(safety)
    }
  }, [visible])

  if (!visible) return null

  // Written straight to the DOM — timeupdate fires ~4x/sec and doesn't need a re-render.
  const handleTimeUpdate = () => {
    const video = videoRef.current
    const bar = barRef.current
    if (!video || !bar || !video.duration) return
    bar.style.width = `${(video.currentTime / video.duration) * 100}%`
  }

  return (
    <div
      role="dialog"
      aria-label="BYTE intro video"
      className={`fixed inset-0 z-[10000] overflow-hidden bg-black transition-opacity ease-out ${
        fading ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ transitionDuration: `${FADE_MS}ms` }}
    >
      <video
        ref={videoRef}
        src="/byte_website_video.mp4"
        poster="/byte-intro-poster.jpg"
        autoPlay
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        className="h-full w-full object-cover"
        onEnded={() => dismissRef.current()}
        onError={() => dismissRef.current()}
        onTimeUpdate={handleTimeUpdate}
      />

      {/* Darkens the lower edge so Skip stays legible over bright frames. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/80 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 flex items-center justify-end px-4 pb-[calc(env(safe-area-inset-bottom)+1rem)] sm:px-6 sm:pb-[calc(env(safe-area-inset-bottom)+1.5rem)]">
        <button
          ref={skipRef}
          onClick={() => dismissRef.current()}
          className="flex h-11 items-center gap-2 border border-[#222222] bg-black/40 px-5 font-mono text-xs tracking-widest text-muted uppercase backdrop-blur-sm transition-colors hover:border-white hover:text-white"
        >
          Skip
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-white/10">
        <div ref={barRef} className="h-full w-0 bg-neon" />
      </div>
    </div>
  )
}
