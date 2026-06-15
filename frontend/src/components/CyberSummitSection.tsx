import { Link } from 'react-router-dom'

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
        <p className="mb-4 font-mono text-xs tracking-widest text-accent uppercase">
          Featured Conference
        </p>

        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center">
          <h2 className="text-5xl font-black tracking-tight md:text-7xl">
            TMU CYBER<br />SUMMIT
          </h2>
          <span className="self-start border border-[#222222] px-3 py-1.5 font-mono text-xs tracking-widest text-muted uppercase md:self-center">
            Coming Fall 2025
          </span>
        </div>

        <p className="mb-12 max-w-lg text-lg text-muted">
          Toronto's premier student cybersecurity conference — workshops, a live CTF, and keynote speakers from industry.
        </p>

        <div className="mb-12 grid grid-cols-1 gap-4 md:grid-cols-3">
          {FEATURES.map(({ icon, title, desc }) => (
            <div
              key={title}
              className="border border-[#222222] bg-[#111111] p-6 transition-colors hover:border-accent"
            >
              <span className="mb-4 block font-mono text-2xl text-accent">{icon}</span>
              <h3 className="mb-2 font-mono text-sm tracking-widest text-white uppercase">{title}</h3>
              <p className="text-sm text-muted">{desc}</p>
            </div>
          ))}
        </div>

        <Link
          to="/cybersecurity"
          className="font-mono text-sm tracking-widest text-accent uppercase transition-colors hover:text-white"
        >
          Learn More →
        </Link>
      </div>
    </section>
  )
}
