import { useState, useEffect, useRef } from 'react'
import { useInView } from '../hooks/useInView'

const SLIDES = [
  { id: 1, label: 'BYTE Launch',         src: '/images/events/bytelaunch.jpeg' },
  { id: 2, label: 'Demo Day',            src: '/images/events/Demoday.JPG' },
  { id: 3, label: 'DevFest Event',       src: '/images/events/devfestevent.JPG' },
  { id: 4, label: 'TMSU Street Fair',    src: '/images/events/tmsustreetfair.jpeg' },
  { id: 5, label: 'TMU Tech Week',       src: '/images/events/Tmutechweek.png' },
]

const INTERVAL = 4000

export default function ImageCarousel() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const [ref, inView] = useInView(0.1)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  function prev() {
    setCurrent((c) => (c === 0 ? SLIDES.length - 1 : c - 1))
  }

  function next() {
    setCurrent((c) => (c === SLIDES.length - 1 ? 0 : c + 1))
  }

  useEffect(() => {
    if (paused) return
    timerRef.current = setInterval(next, INTERVAL)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [paused, current])

  return (
    <section className="border-y border-[#222222] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div ref={ref} className="mb-8">
          <p className={`reveal ${inView ? 'visible' : ''} mb-2 font-mono text-xs tracking-widest text-accent uppercase`}>
            Gallery
          </p>
          <h2 className={`reveal delay-100 ${inView ? 'visible' : ''} text-4xl font-black tracking-tight md:text-5xl`}>
            Club Life
          </h2>
        </div>
                <div
          className={`reveal delay-200 ${inView ? 'visible' : ''} relative`}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* overflow-hidden only on the slides, not the buttons */}
          <div className="overflow-hidden">
            <div
              className="flex carousel-slide"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {SLIDES.map((slide) => (
                <div key={slide.id} className="min-w-full h-80 md:h-[28rem] relative">
                  <img
                    src={slide.src}
                    alt={slide.label}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-4 sm:p-8">
                    <p className="font-mono text-sm tracking-widest text-white/80 uppercase">
                      {slide.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prev}
            aria-label="Previous"
            className="absolute left-2 top-1/2 -translate-y-1/2 border border-[#222222] bg-black/80 p-2 text-white transition-all duration-200 hover:border-accent hover:text-accent hover:scale-110 sm:left-4 sm:p-3"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            aria-label="Next"
            className="absolute right-2 top-1/2 -translate-y-1/2 border border-[#222222] bg-black/80 p-2 text-white transition-all duration-200 hover:border-accent hover:text-accent hover:scale-110 sm:right-4 sm:p-3"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className={`reveal delay-300 ${inView ? 'visible' : ''} mt-4 flex justify-center gap-2`}>
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1 transition-all duration-300 ${
                i === current ? 'w-8 bg-accent' : 'w-2 bg-[#333333] hover:bg-[#555555]'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}