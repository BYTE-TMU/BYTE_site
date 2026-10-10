import { Link } from 'react-router-dom'
import Reveal from './Reveal'
import SummitDate from './summit/SummitDate'
import SummitSilk from './summit/SummitSilk'
import SummitWordmark from './summit/SummitWordmark'

const FEATURES = [
  {
    icon: '◈',
    title: 'WORKSHOPS',
    desc: 'Hands-on sessions covered offensive and defensive security, cloud, and AI in the SOC.',
  },
  {
    icon: '⬡',
    title: 'CTF COMPETITION',
    desc: 'A beginner-friendly Capture The Flag, built in-house, opened up security to every skill level.',
  },
  {
    icon: '◎',
    title: 'KEYNOTE SPEAKERS',
    desc: 'Industry leaders from Rogers, RBC, KPMG, Amazon, CIBC and more took the stage.',
  },
]

export default function CyberSummitSection() {
  return (
    <section className="summit-bg relative overflow-hidden px-6 py-24 font-summit">
      <SummitSilk />
      <div className="relative mx-auto max-w-6xl">
        <Reveal>
          <p className="mb-4 text-xs font-semibold tracking-[0.3em] text-summit-teal uppercase sm:text-sm">
            Featured Conference · Recap
          </p>
        </Reveal>

        <Reveal delayMs={100} className="mb-6 flex flex-col gap-6 md:flex-row md:items-center md:gap-10">
          <h2>
            <SummitWordmark className="text-4xl sm:text-6xl md:text-5xl lg:text-7xl" />
          </h2>
          <SummitDate />
        </Reveal>

        <Reveal delayMs={200}>
          <p className="mb-12 max-w-lg text-lg font-light text-white/70">
            Toronto&rsquo;s premier student cybersecurity conference has wrapped. Relive the workshops, panels, CTF and gala.
          </p>
        </Reveal>

        <div className="mb-12 grid grid-cols-1 gap-4 md:grid-cols-3">
          {FEATURES.map(({ icon, title, desc }, i) => (
            <Reveal key={title} threshold={0.1} delayMs={(i % 3) * 150} className="summit-card p-6">
              <span className="mb-4 block text-2xl text-summit-teal">{icon}</span>
              <h3 className="mb-2 text-sm font-semibold tracking-widest text-white uppercase">{title}</h3>
              <p className="text-sm font-light text-white/70">{desc}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delayMs={300}>
          <Link
            to="/cybersecurity"
            className="inline-block rounded-full bg-summit-teal px-8 py-3 text-sm font-semibold tracking-widest text-summit-ink uppercase transition-opacity hover:opacity-85"
          >
            View the Recap →
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
