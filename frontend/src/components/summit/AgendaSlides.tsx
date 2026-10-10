import { useEffect, useRef, useState } from 'react'
import { DAYS, type SessionKind, type Speaker } from '../../lib/summitAgenda'

const NEUTRAL = 'border-white/20 bg-white/5 text-white/70'
const KIND_STYLE: Record<SessionKind, string> = {
  Keynote: 'border-summit-teal/50 bg-summit-teal/10 text-summit-teal',
  Competition: 'border-summit-teal/50 bg-summit-teal/10 text-summit-teal',
  Workshop: 'border-summit-sky/50 bg-summit-sky/10 text-summit-sky',
  Talk: 'border-summit-sky/50 bg-summit-sky/10 text-summit-sky',
  Panel: 'border-summit-violet/60 bg-summit-violet/15 text-violet-300',
  Gala: 'border-amber-300/40 bg-amber-300/10 text-amber-300',
  Welcome: NEUTRAL,
  Activity: NEUTRAL,
  Networking: NEUTRAL,
  Break: NEUTRAL,
  Announcement: NEUTRAL,
}

// One flat deck across both days so "next" on the last Day 1 slide continues into Day 2.
const SLIDES = DAYS.flatMap((day, dayIndex) =>
  day.sessions.map((session, index) => ({ day, dayIndex, session, index })),
)
const FIRST_SLIDE_OF_DAY = DAYS.map((_, d) => SLIDES.findIndex((s) => s.dayIndex === d))

const SWIPE_PX = 50
/** How long each slide stays up while auto-advancing. */
const AUTOPLAY_MS = 5000

function minutes(time: string) {
  const [clock, meridiem] = time.split(' ')
  const [h, m] = clock.split(':').map(Number)
  return ((h % 12) + (meridiem === 'PM' ? 12 : 0)) * 60 + m
}

function duration(start: string, end: string) {
  const total = minutes(end) - minutes(start)
  const h = Math.floor(total / 60)
  const m = total % 60
  return [h && `${h} hr${h > 1 ? 's' : ''}`, m && `${m} min`].filter(Boolean).join(' ')
}

function initials(name: string) {
  const words = name.split(' ')
  return words[0][0] + (words.length > 1 ? words[words.length - 1][0] : '')
}

function speakersLabel(kind: SessionKind, count: number) {
  if (kind === 'Welcome') return 'Hosted by'
  if (kind === 'Panel') return 'Panelists'
  return count > 1 ? 'Speakers' : 'Speaker'
}

function SpeakerCard({ speaker }: { speaker: Speaker }) {
  const detail = [speaker.role, speaker.org].filter(Boolean).join(' · ')
  return (
    <li className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3">
      <span
        aria-hidden
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-summit-teal/40 bg-gradient-to-br from-summit-indigo/40 to-summit-violet/30 text-sm font-semibold text-white"
      >
        {initials(speaker.name)}
      </span>
      <div className="min-w-0">
        <p className="font-semibold text-white">{speaker.name}</p>
        {detail && <p className="text-xs font-light text-white/60">{detail}</p>}
      </div>
    </li>
  )
}

const arrowButton =
  'shrink-0 rounded-full border border-summit-teal/40 p-2.5 text-white transition-colors hover:border-summit-teal hover:text-summit-teal disabled:pointer-events-none disabled:opacity-30'

export default function AgendaSlides() {
  const [pos, setPos] = useState(0)
  const [direction, setDirection] = useState<'next' | 'prev'>('next')
  const rootRef = useRef<HTMLDivElement>(null)
  const railRef = useRef<HTMLDivElement>(null)
  const touchStart = useRef<{ x: number; y: number } | null>(null)

  // Auto-advance. It never runs for people who prefer reduced motion, and it only runs while the
  // agenda is on screen, the tab is visible, and nobody is hovering or focused on it, so it
  // won't move a slide someone is reading or using. It resumes once they move away.
  const [autoplay] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [onScreen, setOnScreen] = useState(false)
  const [tabVisible, setTabVisible] = useState(() => !document.hidden)
  const playing = autoplay && !hovered && !focused && onScreen && tabVisible

  const { day, dayIndex, session, index } = SLIDES[pos]

  function goTo(target: number, dir: 'next' | 'prev' = target > pos ? 'next' : 'prev') {
    if (target < 0 || target >= SLIDES.length || target === pos) return
    setDirection(dir)
    setPos(target)
  }

  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), { threshold: 0.25 })
    observer.observe(el)
    const onVisibility = () => setTabVisible(!document.hidden)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  // One timer per slide: it restarts whenever the slide changes or playback pauses and resumes,
  // which keeps it in step with the progress bar animation below. Loops back to the start.
  useEffect(() => {
    if (!playing) return
    const timer = setTimeout(() => goTo(pos === SLIDES.length - 1 ? 0 : pos + 1, 'next'), AUTOPLAY_MS)
    return () => clearTimeout(timer)
  }, [playing, pos])

  // Keep the active chip centred in the rail. Scrolls the rail itself, never the page.
  useEffect(() => {
    const rail = railRef.current
    const chip = rail?.children[index] as HTMLElement | undefined
    if (!rail || !chip) return
    rail.scrollTo({ left: chip.offsetLeft - (rail.clientWidth - chip.clientWidth) / 2, behavior: 'smooth' })
  }, [pos, index])

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowRight') goTo(pos + 1)
    else if (e.key === 'ArrowLeft') goTo(pos - 1)
  }

  function onTouchEnd(e: React.TouchEvent) {
    const start = touchStart.current
    touchStart.current = null
    if (!start) return
    const dx = e.changedTouches[0].clientX - start.x
    const dy = e.changedTouches[0].clientY - start.y
    // Mostly-horizontal drags only, so scrolling the page past the slide never flips it.
    if (Math.abs(dx) > SWIPE_PX && Math.abs(dx) > Math.abs(dy) * 1.5) goTo(pos + (dx < 0 ? 1 : -1))
  }

  const speakers = session.speakers ?? []
  const [clock, meridiem] = session.start.split(' ')

  return (
    <div
      ref={rootRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Summit agenda"
      onKeyDown={onKeyDown}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false) }}
    >
      {/* Day tabs */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div role="tablist" aria-label="Summit day" className="inline-flex rounded-full border border-white/15 p-1">
          {DAYS.map((d, i) => (
            <button
              key={d.label}
              role="tab"
              aria-selected={i === dayIndex}
              onClick={() => goTo(FIRST_SLIDE_OF_DAY[i])}
              className={`rounded-full px-4 py-2 text-xs font-semibold tracking-widest uppercase transition-colors sm:px-5 sm:text-sm ${
                i === dayIndex ? 'bg-summit-teal text-summit-ink' : 'text-white/70 hover:text-white'
              }`}
            >
              {d.label} <span className="font-light normal-case tracking-normal opacity-80">· {d.date}</span>
            </button>
          ))}
        </div>
        <p className="text-lg font-bold text-summit-teal">{day.theme}</p>
      </div>

      <div className="summit-card overflow-hidden">
        {/* Progress through the day */}
        <div aria-hidden className="flex gap-1 px-5 pt-5 sm:px-8">
          {day.sessions.map((s, i) => (
            <span key={s.start + s.title} className="relative h-1 flex-1 overflow-hidden rounded-full bg-white/10">
              {i <= index && (
                // The current segment fills over AUTOPLAY_MS as a countdown; it restarts with each slide.
                <span
                  key={i === index ? `${pos}-${playing}` : 'done'}
                  className={`absolute inset-0 bg-summit-teal ${i === index && playing ? 'summit-slide-timer' : ''}`}
                  style={i === index && playing ? { animationDuration: `${AUTOPLAY_MS}ms` } : undefined}
                />
              )}
            </span>
          ))}
        </div>

        <div
          key={pos}
          aria-live={playing ? 'off' : 'polite'}
          aria-label={`Session ${index + 1} of ${day.sessions.length}`}
          className={`grid min-h-[26rem] gap-6 p-5 sm:p-8 md:grid-cols-[13rem_1fr] md:gap-10 ${
            direction === 'next' ? 'summit-slide-next' : 'summit-slide-prev'
          }`}
          onTouchStart={(e) => { touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY } }}
          onTouchEnd={onTouchEnd}
        >
          {/* When */}
          <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5 md:flex-col md:items-start md:justify-start md:border-r md:border-b-0 md:pr-8 md:pb-0">
            <p className="text-xs font-light tracking-[0.2em] text-white/60 uppercase">
              Session <span className="font-semibold text-white">{String(index + 1).padStart(2, '0')}</span> / {day.sessions.length}
            </p>
            <div className="text-right md:mt-6 md:text-left">
              <p className="summit-gradient-text text-4xl font-bold tabular-nums sm:text-5xl">
                {clock}
                <span className="ml-1 text-lg font-semibold">{meridiem}</span>
              </p>
              <p className="mt-1 text-sm font-light text-white/70">until {session.end}</p>
              <p className="mt-3 inline-block rounded-full border border-white/15 px-3 py-1 text-xs tracking-wider text-white/70">
                {duration(session.start, session.end)}
              </p>
            </div>
          </div>

          {/* What */}
          <div>
            <span className={`mb-4 inline-block rounded-full border px-3 py-1 text-xs font-semibold tracking-widest uppercase ${KIND_STYLE[session.kind]}`}>
              {session.kind}
            </span>
            <h3 className="text-2xl leading-tight font-bold tracking-tight text-white sm:text-3xl">{session.title}</h3>
            {session.description && (
              <p className="mt-4 max-w-xl font-light leading-relaxed text-white/70">{session.description}</p>
            )}
            {speakers.length > 0 && (
              <div className="mt-8">
                <p className="mb-3 text-xs font-light tracking-[0.2em] text-white/60 uppercase">
                  {speakersLabel(session.kind, speakers.length)}
                </p>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {speakers.map((s) => <SpeakerCard key={s.name} speaker={s} />)}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Prev / timeline rail / next */}
      <div className="mt-4 flex items-center gap-3">
        <button type="button" aria-label="Previous session" className={arrowButton} disabled={pos === 0} onClick={() => goTo(pos - 1)}>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div
          ref={railRef}
          className="relative flex min-w-0 flex-1 gap-2 overflow-x-auto py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {day.sessions.map((s, i) => (
            <button
              key={s.start + s.title}
              type="button"
              aria-label={`Go to ${s.title}, ${s.start}`}
              aria-current={i === index}
              onClick={() => goTo(FIRST_SLIDE_OF_DAY[dayIndex] + i)}
              className={`shrink-0 rounded-xl border px-3 py-2 text-left transition-colors ${
                i === index ? 'border-summit-teal bg-summit-teal/10' : 'border-white/10 hover:border-white/30'
              }`}
            >
              <span className="block text-[0.65rem] font-semibold text-summit-teal">{s.start}</span>
              <span className="block max-w-[8.5rem] truncate text-xs text-white/80">{s.title}</span>
            </button>
          ))}
        </div>
        <button type="button" aria-label="Next session" className={arrowButton} disabled={pos === SLIDES.length - 1} onClick={() => goTo(pos + 1)}>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}
