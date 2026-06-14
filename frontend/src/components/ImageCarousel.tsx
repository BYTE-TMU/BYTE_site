import { useState } from 'react'
import { useInView } from '../hooks/useInView'

const SLIDES = [
  { id: 1, label: 'LLM Workshop — Spring 2025', gradient: 'from-emerald-900 to-black' },
  { id: 2, label: 'BYTE × TechTMU Hackathon', gradient: 'from-blue-900 to-black' },
  { id: 3, label: 'AI in Industry Panel', gradient: 'from-purple-900 to-black' },
  { id: 4, label: 'End-of-Year Social', gradient: 'from-orange-900 to-black' },
  { id: 5, label: 'RAG Deep Dive Workshop', gradient: 'from-rose-900 to-black' },
]

export default function ImageCarousel() {
  const [current, setCurrent] = useState(0)
  const [ref, inView] = useInView(0.1)

  function prev() {
    setCurrent((c) => (c === 0 ? SLIDES.length - 1 : c - 1))
  }

  function next() {
    setCurrent((c) => (c === SLIDES.length - 1 ? 0 : c + 1))
  }

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
        <div className={`reveal delay-200 ${inView ? 'visible' : ''} relative overflow-hidden`}>
          <div
            className="flex carousel-slide"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {SLIDES.map((slide) => (
              <div
                key={slide.id}
                className={`min-w-full h-80 md:h-[28rem] bg-gradient-to-br ${slide.gradient} flex items-end`}
              >
                <div className="p-8">
                  <p className="font-mono text-sm tracking-widest text-white/60 uppercase">
                    {slide.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={prev}
            aria-label="Previous"
            className="absolute left-4 top-1/2 -translate-y-1/2 border border-[#222222] bg-black/80 p-3 text-white transition-all duration-200 hover:border-accent hover:text-accent hover:scale-110"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            aria-label="Next"
            className="absolute right-4 top-1/2 -translate-y-1/2 border border-[#222222] bg-black/80 p-3 text-white transition-all duration-200 hover:border-accent hover:text-accent hover:scale-110"
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
