import { Link } from 'react-router-dom'

export default function HeroSection() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-6 pt-20 text-center">
      <p className="animate-fade-up anim-delay-0 mb-6 font-mono text-xs tracking-widest text-muted uppercase">
        Toronto Metropolitan University · Student AI Club
      </p>
      <h1 className="mb-6 text-6xl font-black leading-none tracking-tight md:text-8xl lg:text-9xl">
        <span className="inline-block animate-word-in anim-delay-100">
          <span className="text-accent">B</span>
          <span className="text-white">UILD </span>
        </span>
        <span className="inline-block animate-word-in anim-delay-200">
          <span className="text-accent">Y</span>
          <span className="text-white">OUR </span>
        </span>
        <span className="inline-block animate-word-in anim-delay-300">
          <span className="text-accent">T</span>
          <span className="text-white">ECH </span>
        </span>
        <span className="inline-block animate-word-in anim-delay-400">
          <span className="text-accent">E</span>
          <span className="text-white">XPERIENCE</span>
        </span>
      </h1>
      <p className="animate-fade-up anim-delay-500 mb-10 max-w-xl text-lg text-muted md:text-xl">
        We build, research, and explore AI together. Open to all TMU students — no experience required.
      </p>
      <div className="animate-fade-up anim-delay-600 flex flex-col items-center gap-4 sm:flex-row">
        <a
          href="#"
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
      <div className="animate-fade-up anim-delay-700 mt-20 flex flex-col items-center gap-2">
        <span className="font-mono text-xs tracking-widest text-[#333333] uppercase">Scroll</span>
        <svg className="h-4 w-4 animate-bounce text-[#333333]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}
