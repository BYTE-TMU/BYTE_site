import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const WORDS = ['BUILD ', 'YOUR ', 'TECH ', 'EXPERIENCE']
const ACCENT_LETTERS = ['B', 'Y', 'T', 'E']

function useTypewriter(words: string[], speed = 60) {
  const [displayed, setDisplayed] = useState<string[]>([])
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (done) return
    if (wordIndex >= words.length) { setDone(true); return }

    const word = words[wordIndex]

    if (charIndex < word.length) {
      const t = setTimeout(() => setCharIndex(c => c + 1), speed)
      return () => clearTimeout(t)
    } else {
      const t = setTimeout(() => {
        setDisplayed(d => [...d, word])
        setWordIndex(w => w + 1)
        setCharIndex(0)
      }, speed)
      return () => clearTimeout(t)
    }
  }, [wordIndex, charIndex, done, words, speed])

  const currentTyping = wordIndex < words.length ? words[wordIndex].slice(0, charIndex) : ''
  return { displayed, currentTyping, wordIndex }
}

export default function HeroSection() {
  const { displayed, currentTyping, wordIndex } = useTypewriter(WORDS, 100)

  const renderWord = (word: string, index: number) => {
    const accent = ACCENT_LETTERS[index]
    return (
      <span key={index} className="inline-block">
        <span className="text-accent">{accent}</span>
        <span className="text-white">{word.slice(1)}</span>
      </span>
    )
  }

  const renderTyping = (partial: string, index: number) => {
    if (!partial) return null
    const accent = ACCENT_LETTERS[index]
    const hasAccent = partial.length >= 1
    return (
      <span key="typing" className="inline-block">
        {hasAccent && <span className="text-accent">{accent}</span>}
        <span className="text-white">{partial.slice(1)}</span>
        <span className="animate-pulse text-accent">|</span>
      </span>
    )
  }

  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-6 pt-20 text-center">
      <p className="animate-fade-up anim-delay-0 mb-6 font-mono text-xs tracking-widest text-muted uppercase">
        TMU's First Student-Led AI Innovation Lab
      </p>
      <h1 className="mb-6 text-6xl font-black leading-none tracking-tight md:text-8xl lg:text-9xl space-x-2">
        {displayed.map((word, i) => renderWord(word, i))}
        {renderTyping(currentTyping, wordIndex)}
      </h1>
      <p className="animate-fade-up anim-delay-500 mb-10 max-w-xl text-lg text-muted md:text-xl">
        We build, research, and explore AI together. Open to all TMU students — no experience required.
      </p>
      <div className="animate-fade-up anim-delay-600 flex flex-col items-center gap-4 sm:flex-row">
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSdhPrWMuOerfjza3Wb_6noIe_of1Y_rr3Kmb5pi0l7k3N62QA/viewform"
          className="rounded-none border border-accent bg-accent px-8 py-3 font-mono text-sm font-bold tracking-widest text-black uppercase transition-colors hover:bg-transparent hover:text-accent"
        >
          Apply Now
        </a>
        <Link
          to="/events"
          className="rounded-none border border-[#222222] px-8 py-3 font-mono text-sm tracking-widest text-muted uppercase transition-colors hover:border-white hover:text-white"
        >
          See Events
        </Link>
      </div>
      <div className="animate-fade-up anim-delay-3000 mt-20 flex flex-col items-center gap-2">
        <span className="font-mono text-xs tracking-widest text-[#333333] uppercase">Scroll</span>
        <svg className="h-4 w-4 animate-bounce text-[#333333]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}