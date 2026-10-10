import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useInView } from '../hooks/useInView'
import { useScrollEffect } from '../hooks/useScrollEffect'
import PhotoLightbox, { type AlbumPhoto } from '../components/PhotoLightbox'
import AgendaSlides from '../components/summit/AgendaSlides'
import ScrollProgress from '../components/summit/ScrollProgress'
import ScrollReveal from '../components/summit/ScrollReveal'
import SummitDate from '../components/summit/SummitDate'
import SummitSilk from '../components/summit/SummitSilk'
import SummitWave from '../components/summit/SummitWave'
import SummitWordmark from '../components/summit/SummitWordmark'

const INSTAGRAM_URL = 'https://www.instagram.com/tmu.byte/'

// TODO: replace the placeholder stats with the real figures. "Speakers & Panelists" is counted
// from the agenda (BYTE hosts excluded); every other value is a placeholder. Each number counts
// up to exactly the value given here.
const STATS = [
  { value: 17, label: 'Speakers & Panelists' },
  { value: 100, label: 'Attendees' },
  { value: 12, label: 'Partner Organizations' },
  { value: 100, label: 'CTF Competitors' },
  { value: 10, label: 'Universities Represented' },
  { value: 14, label: 'Sessions & Workshops' },
]

const SPONSOR_LOGOS = [
  { name: '88', src: '/images/Partner%20Logos/88_logo.png', surface: 'white' },
  { name: 'AWS', src: '/images/Partner%20Logos/AWS_logo.png' },
  { name: 'ArmorCode', src: '/images/Partner%20Logos/ArmorCode_logo.png', tier: 'Bronze', halo: 'bronze' },
  { name: 'Borikong', src: '/images/Partner%20Logos/Borikong_logo.png' },
  { name: 'CrowdStrike', src: '/images/Partner%20Logos/CrowdStrike_logo.svg', surface: 'white' },
  { name: 'ISC2', src: '/images/Partner%20Logos/ISC2_logo.png' },
  { name: 'NEX', src: '/images/Partner%20Logos/Nex_logo.jpg' },
  { name: 'RBC', src: '/images/Partner%20Logos/RBC_logo.png', tier: 'Silver', halo: 'silver' },
  { name: 'Rogers Cybersecure Catalyst', src: '/images/Partner%20Logos/RCC_logo.png', surface: 'white', halo: 'teal' },
  { name: 'SACR', src: '/images/Partner%20Logos/SACR_logo.png', tier: 'Silver', halo: 'silver' },
]

// To swap or add photos: drop the full-size originals in frontend/photo-originals/, run
// `npm run photos:recap -- photo-originals`, and update this list. The script prints each entry with
// its original file name; the order below is the order they appear in the album, so reorder freely.
// The first INITIAL_VISIBLE show before "View all", so lead with the strongest and most varied.
const ALBUM: AlbumPhoto[] = [
  { src: '/cyber_images/recap/01.jpg', width: 1800, height: 1019, alt: 'Attendees seated at desks with laptops, watching a session intently' }, // DSC07285
  { src: '/cyber_images/recap/06.jpg', width: 1800, height: 1019, alt: 'A speaker presenting at a podium beside a screen with an about-me slide, while attendees watch from round tables' }, // DSC07702
  { src: '/cyber_images/recap/05.jpg', width: 1800, height: 1019, alt: 'A person with an event badge holding a coffee in front of a large screen that reads "Capture The Flag!"' }, // DSC07499
  { src: '/cyber_images/recap/08.jpg', width: 1800, height: 1200, alt: 'People posing together at a sponsor table with RBC branding, water bottles and QR codes' }, // IMG_0103
  { src: '/cyber_images/recap/09.jpg', width: 1800, height: 1200, alt: 'Two attendees holding CTF competition award certificates, "Last Man Standing" and "Most Involved Attendee"' }, // IMG_0279
  { src: '/cyber_images/recap/04.jpg', width: 1800, height: 1019, alt: 'Two attendees looking at a laptop together at a table while others work on laptops behind them' }, // DSC07497
  { src: '/cyber_images/recap/07.jpg', width: 1800, height: 1200, alt: 'Six people posing in front of a Rogers Cybersecure Catalyst and CyberStart Canada banner beside large windows' }, // IMG_0079
  { src: '/cyber_images/recap/03.jpg', width: 1800, height: 1019, alt: 'A speaker in a blazer holding a coffee cup, presenting in front of the sponsor wall to attendees at tables' }, // DSC07468
  { src: '/cyber_images/recap/02.jpg', width: 1800, height: 1200, alt: 'Eight people posing together on stage in front of the sponsor wall, some holding gift bags' }, // IMG_0799
  { src: '/cyber_images/recap/10.jpg', width: 1800, height: 1200, alt: 'Seven people posing on stage in front of the sponsor wall, one holding a microphone' }, // IMG_9987
]

const INITIAL_VISIBLE = 6

const BUTTON_FILLED =
  'rounded-full bg-summit-teal px-8 py-3 text-sm font-semibold tracking-widest text-summit-ink uppercase transition-opacity hover:opacity-85'
const BUTTON_OUTLINE =
  'rounded-full border border-white/30 px-8 py-3 text-sm font-semibold tracking-widest text-white uppercase transition-colors hover:border-summit-teal hover:text-summit-teal'

// Hero parallax: the glow drifts slower than the page, and the hero copy fades as it scrolls away.
function driftSilk(scrollY: number, el: HTMLDivElement) {
  el.style.transform = `translate3d(0, ${Math.min(scrollY, 900) * 0.25}px, 0)`
}
function fadeHeroContent(scrollY: number, el: HTMLDivElement) {
  el.style.opacity = String(Math.max(1 - scrollY / 450, 0))
  el.style.transform = `translate3d(0, ${Math.min(scrollY, 450) * 0.15}px, 0)`
}

/** Counts from 0 up to exactly `to` the first time it scrolls into view. */
function CountUp({ to }: { to: number }) {
  const [ref, inView] = useInView<HTMLSpanElement>(0.5)
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const t0 = performance.now()
    let raf = requestAnimationFrame(function tick(now) {
      const t = reduceMotion ? 1 : Math.min((now - t0) / 1600, 1)
      setN(Math.round(to * (1 - (1 - t) ** 3))) // ease-out; lands on exactly `to` at t = 1
      if (t < 1) raf = requestAnimationFrame(tick)
    })
    return () => cancelAnimationFrame(raf)
  }, [inView, to])

  return <span ref={ref}>{n}</span>
}

function SectionHead({ eyebrow, light, bold }: { eyebrow: string; light: string; bold: string }) {
  return (
    <div className="mb-10 sm:mb-12">
      <ScrollReveal>
        <p className="mb-3 text-xs font-semibold tracking-[0.3em] text-summit-teal uppercase sm:text-sm">{eyebrow}</p>
      </ScrollReveal>
      <ScrollReveal delay={100}>
        <h2 className="text-3xl tracking-tight sm:text-4xl md:text-5xl">
          <span className="font-light">{light} </span>
          <span className="summit-gradient-text font-bold">{bold}</span>
        </h2>
      </ScrollReveal>
      <ScrollReveal variant="line" delay={250} className="mt-5 h-px w-24 bg-gradient-to-r from-summit-teal to-transparent" />
    </div>
  )
}

export default function CyberSummit() {
  const silkRef = useScrollEffect<HTMLDivElement>(driftSilk)
  const heroContentRef = useScrollEffect<HTMLDivElement>(fadeHeroContent)

  const [showAll, setShowAll] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const visiblePhotos = showAll ? ALBUM : ALBUM.slice(0, INITIAL_VISIBLE)

  return (
    <div className="summit-bg min-h-screen overflow-x-hidden font-summit text-white">
      <ScrollProgress />

      {/* ── Hero ── */}
      <section className="relative flex min-h-[80svh] flex-col items-center justify-center overflow-hidden px-6 pt-40 pb-32 text-center sm:pb-40">
        <div aria-hidden className="summit-grid absolute inset-0" />
        <div ref={silkRef} aria-hidden className="absolute inset-x-0 -top-1/4 bottom-0">
          <SummitSilk />
        </div>
        <div ref={heroContentRef} className="relative flex w-full flex-col items-center">
          <ScrollReveal>
            <p className="mb-6 text-xs font-semibold tracking-[0.3em] text-summit-teal uppercase sm:text-sm">
              BYTE Presents · 2026 Recap
            </p>
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <h1 className="mb-6">
              <SummitWordmark className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl" />
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={240}>
            <p className="mb-8 text-3xl tracking-tight sm:text-5xl">
              <span className="font-light">That&rsquo;s a </span>
              <span className="font-bold">wrap.</span>
            </p>
          </ScrollReveal>
          <ScrollReveal delay={360}>
            <SummitDate className="mb-6" />
          </ScrollReveal>
          <ScrollReveal delay={440}>
            <p className="mb-10 max-w-lg font-light leading-relaxed text-white/70">
              Two days of workshops, panels, CTF and a closing gala. Thank you to every speaker, sponsor, volunteer and attendee who made it happen.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={520}>
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <a href="#album" className={BUTTON_FILLED}>View the Album ↓</a>
              <a href="#recap" className={BUTTON_OUTLINE}>What Happened</a>
            </div>
          </ScrollReveal>
        </div>
        <div className="absolute inset-x-0 bottom-0">
          <SummitWave />
        </div>
      </section>

      {/* ── By the Numbers ── */}
      <section className="px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHead eyebrow="The Summit" light="By the" bold="Numbers" />
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
            {STATS.map(({ value, label }, i) => (
              <ScrollReveal key={label} variant="zoom" delay={(i % 3) * 120} className="h-full">
                <div className="summit-card h-full p-5 text-center sm:p-8">
                  <p className="summit-gradient-text mb-2 text-4xl font-bold tabular-nums sm:text-5xl lg:text-6xl">
                    <CountUp to={value} />
                  </p>
                  <p className="text-[0.65rem] font-light tracking-[0.18em] text-white/70 uppercase sm:text-xs">{label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── The Album ── */}
      <section id="album" className="scroll-mt-24 px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHead eyebrow="Photo Album" light="Moments from the" bold="Summit" />
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
            {visiblePhotos.map((photo, i) => (
              <ScrollReveal key={photo.src} variant="zoom" delay={(i % 3) * 100} className="mb-4 break-inside-avoid">
                <button
                  type="button"
                  onClick={() => setLightboxIndex(i)}
                  aria-label={`Open photo ${i + 1} of ${ALBUM.length}: ${photo.alt}`}
                  className="group block w-full overflow-hidden rounded-2xl border border-white/10 bg-summit-navy transition-colors hover:border-summit-teal/70 focus-visible:border-summit-teal focus-visible:outline-none"
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    loading="lazy"
                    decoding="async"
                    className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </button>
              </ScrollReveal>
            ))}
          </div>
          {!showAll && ALBUM.length > INITIAL_VISIBLE && (
            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => setShowAll(true)}
                className="rounded-full border border-summit-teal/60 px-8 py-3 text-sm font-semibold tracking-widest text-summit-teal uppercase transition-colors hover:bg-summit-teal hover:text-summit-ink"
              >
                View all {ALBUM.length} photos
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── What Happened ── */}
      <section id="recap" className="scroll-mt-24 px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHead eyebrow="What Happened" light="Two Days," bold="Recapped" />
          <ScrollReveal threshold={0.05}>
            <AgendaSlides />
          </ScrollReveal>
        </div>
      </section>

      {/* ── Sponsors & Partners ── */}
      <section className="px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHead eyebrow="Our Sponsors" light="Sponsors &" bold="Partners" />
          <div className="grid grid-cols-2 justify-items-center gap-x-5 gap-y-8 sm:grid-cols-3 md:grid-cols-5">
            {SPONSOR_LOGOS.map(({ name, src, surface, tier, halo }, i) => (
              <ScrollReveal key={name} variant="zoom" delay={(i % 5) * 80}>
                <div data-surface={surface ?? 'dark'} data-halo={halo ?? 'green'} className="cyber-sponsor-card w-28 text-center sm:w-32">
                  <div className="tech-week-partner-card mx-auto flex h-28 w-28 items-center justify-center p-2 sm:h-32 sm:w-32">
                    <div className="tech-week-partner-logo-frame flex h-full w-full items-center justify-center p-2">
                      <img src={src} alt={name} className="max-h-full max-w-full object-contain" loading="lazy" />
                    </div>
                  </div>
                  <span className="mt-3 block min-h-10 text-sm leading-tight font-semibold text-muted">{name}</span>
                  {tier && (
                    <span data-tier={tier.toLowerCase()} className="cyber-sponsor-tier mt-1 block font-mono text-[10px] tracking-widest uppercase">
                      {tier}
                    </span>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Closing ── */}
      <section className="relative mt-8">
        <SummitWave flip />
        <div className="flex flex-col items-center px-6 pt-10 pb-24 text-center sm:pb-32">
          <ScrollReveal>
            <p className="mb-8 text-4xl tracking-tight sm:text-6xl">
              <span className="font-light">See you </span>
              <span className="summit-gradient-text font-bold">next year.</span>
            </p>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className={BUTTON_FILLED}>
                Follow @tmu.byte
              </a>
              <Link to="/events" className={BUTTON_OUTLINE}>More BYTE Events</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <PhotoLightbox
        photos={visiblePhotos}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onIndexChange={setLightboxIndex}
      />
    </div>
  )
}
