import { Link } from 'react-router-dom'
import Reveal from './Reveal'

const INTEREST_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSdTXJmwg4CDZouFuuRKnW73MgkD35Jf0kDWm0RCjySXCTE1IA/viewform'

const FEATURES = [
  {
    icon: '◈',
    title: 'WORKSHOPS',
    desc: 'Hands-on sessions covering offensive and defensive security techniques.',
  },
  {
    icon: '⬡',
    title: 'CTF COMPETITION',
    desc: 'Capture The Flag challenges for all skill levels — prizes for top teams.',
  },
  {
    icon: '◎',
    title: 'KEYNOTE SPEAKERS',
    desc: 'Hear from leading professionals shaping the cybersecurity landscape.',
  },
]

export default function CyberSummitSection() {
  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="neon-green-text mb-4 font-mono text-sm tracking-widest uppercase">
            Featured Conference
          </p>
        </Reveal>

        <Reveal delayMs={100} className="mb-6 flex flex-col gap-4 md:flex-row md:items-center">
          <h2 className="text-5xl font-black tracking-tight md:text-7xl">
            TMU CYBER<br />SUMMIT
          </h2>
          <span className="self-start border border-[#222222] px-3 py-1.5 font-mono text-xs tracking-widest text-muted uppercase md:self-center">
            Coming Fall 2025
          </span>
        </Reveal>

        <Reveal delayMs={200}>
          <p className="mb-12 max-w-lg text-lg text-muted">
            Toronto's premier student cybersecurity conference — workshops, a live CTF, and keynote speakers from industry.
          </p>
        </Reveal>

        <div className="mb-12 grid grid-cols-1 gap-4 md:grid-cols-3">
          {FEATURES.map(({ icon, title, desc }, i) => (
            <Reveal
              key={title}
              threshold={0.1}
              delayMs={(i % 3) * 150}
              className="border border-[#222222] bg-[#111111] p-6 transition-colors hover:border-accent"
            >
              <span className="mb-4 block font-mono text-2xl text-accent">{icon}</span>
              <h3 className="mb-2 font-mono text-sm tracking-widest text-white uppercase">{title}</h3>
              <p className="text-sm text-muted">{desc}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delayMs={300} className="flex flex-wrap items-center gap-6">
          <a
            href={INTEREST_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent px-8 py-3 font-mono text-sm tracking-widest text-black uppercase transition-opacity hover:opacity-80"
          >
            Register Interest →
          </a>
          <Link
            to="/cybersecurity"
            className="font-mono text-sm tracking-widest text-accent uppercase transition-colors hover:text-white"
          >
            Learn More →
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
