import { useState, useEffect, useRef } from 'react'
import { useInView } from '../hooks/useInView'

const SLIDES = [
  { id: 1,  label: 'BYTE Launch',       src: '/images/events/bytelaunch.jpeg' },
  { id: 2,  label: 'Demo Day',          src: '/images/events/Demoday.JPG' },
  { id: 3,  label: 'DevFest Event',     src: '/images/events/devfestevent.JPG' },
  { id: 4,  label: 'TMSU Street Fair',  src: '/images/events/tmsustreetfair.jpeg' },
  { id: 5,  label: 'TMU Tech Week',     src: '/images/events/Tmutechweek.png' },
  { id: 6,  label: 'BYTE Panel',        src: '/cyber_images/collage/real/photo1.jpg' },
  { id: 7,  label: 'Tech Week Audience', src: '/cyber_images/collage/real/photo2.jpg' },
  { id: 8,  label: 'Tech Week Crowd',   src: '/cyber_images/collage/real/photo3.jpg' },
  { id: 9,  label: 'Fireside Chat',     src: '/cyber_images/collage/real/dsc03984.jpg' },
  { id: 10, label: 'Panel Discussion',  src: '/cyber_images/collage/real/impact_dsc04031.jpg' },
  { id: 11, label: 'BYTE Team',         src: '/cyber_images/collage/real/impact_portrait.png' },
  { id: 12, label: 'Workshop Session',      src: '/images/events/469d1ff9669e38ad11bdd91acdb34fa8.JPG' },
  { id: 13, label: 'TMU Tech Week Coding',  src: '/images/events/DSC06369.JPG' },
  { id: 14, label: 'TMU Tech Week Crowd',   src: '/images/events/DSC06372.JPG' },
  { id: 15, label: 'BYTE Info Booth',       src: '/images/events/IMG_1646.JPG' },
  { id: 16, label: 'Campus Outreach',       src: '/images/events/_DSC8954.jpeg' },
  { id: 17, label: 'TMSU Street Fair Crew', src: '/images/events/tmsu-street-fair-2.jpeg' },
]

const INTERVAL = 4000

export default function AboutSection() {
  const [ref, inView] = useInView(0.2)
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  function prev() {
    console.log('prev slide')
    setCurrent((c) => {
      const newSlide = c === 0 ? SLIDES.length - 1 : c - 1
      console.log('slide', c, 'to', newSlide)
      return newSlide
    })
  }

  function next() {
    console.log('next slide')
    setCurrent((c) => (c === SLIDES.length - 1 ? 0 : c + 1))
  }

  useEffect(() => {
    if (paused) return
    timerRef.current = setInterval(next, INTERVAL)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [paused, current])

  return (
    <section id="about" className="border-t border-[#222222] mx-auto max-w-8xl px-7 py-24">
      <div ref={ref} className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <p className={`reveal delay-[0ms] ${inView ? 'visible' : ''} neon-green-text mb-2 font-mono text-sm tracking-widest uppercase`}>
            About
          </p>
          <h2 className={`reveal delay-100 ${inView ? 'visible' : ''} mb-6 text-4xl font-black tracking-tight md:text-5xl`}>
            What is BYTE?
          </h2>
          <div className={`reveal delay-200 ${inView ? 'visible' : ''} max-w-2xl space-y-4 text-lg text-muted`}>
            <p>
              BYTE is TMU's open-source student group that focuses on AI. By joining us, you'll get to gain hands-on experience in real-world AI development by working collaboratively on projects that make a difference.
            </p>
            <p>
              From weekly workshops to semester-long project teams, we give every TMU student the chance to go from zero to shipped, no experience required.
            </p>
          </div>
        </div>

        <div
          className={`reveal delay-300 ${inView ? 'visible' : ''} relative`}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="overflow-hidden border border-[#222222]">
            <div
              className="flex carousel-slide"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {SLIDES.map((slide) => (
                <div key={slide.id} className="min-w-full h-72 sm:h-80 md:h-96 relative">
                  <img
                    src={slide.src}
                    alt={slide.label}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prev}
            aria-label="Previous"
            className="absolute left-2 top-1/2 -translate-y-1/2 border border-[#222222] bg-black/80 p-2 text-white transition-all duration-200 hover:border-accent hover:text-accent hover:scale-110"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            aria-label="Next"
            className="absolute right-2 top-1/2 -translate-y-1/2 border border-[#222222] bg-black/80 p-2 text-white transition-all duration-200 hover:border-accent hover:text-accent hover:scale-110"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
