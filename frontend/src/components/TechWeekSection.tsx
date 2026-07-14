import Reveal from './Reveal'

const STATS = [
  {
    icon: '▣',
    title: '750+ ATTENDEES',
    desc: 'Students, clubs, and industry guests packed events across campus all week.',
  },
  {
    icon: '◆',
    title: '12 EVENTS HOSTED',
    desc: 'Keynotes, workshops, hackathons, and panels spanning every corner of tech.',
  },
  {
    icon: '⬢',
    title: '10+ STUDENT CLUBS',
    desc: 'Campus clubs and student groups that showcased projects and connected all week.',
  },
]

export default function TechWeekSection() {
  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-4 flex items-center gap-2">
          <img
            src="/images/events/tmutechweek-icon.png"
            alt=""
            className="h-4 w-4 object-contain"
          />
          <p className="neon-green-text font-mono text-sm tracking-widest uppercase">
            BYTE @ TMU Tech Week
          </p>
        </Reveal>

        <Reveal delayMs={100} className="mb-6 flex flex-col gap-4 md:flex-row md:items-center">
          <h2 className="text-5xl font-black tracking-tight md:text-7xl">
            TMU TECH<br />WEEK
          </h2>
          <span className="self-start border border-[#222222] px-3 py-1.5 font-mono text-xs tracking-widest text-muted uppercase md:self-center">
            Feb 15 – 22, 2026
          </span>
        </Reveal>

        <Reveal delayMs={200}>
          <p className="mb-12 max-w-lg text-lg text-muted">
            BYTE joined 10+ student clubs and industry leaders for a university-wide celebration of technology, innovation, and creativity across TMU's campus. The week has wrapped — here's a look back.
          </p>
        </Reveal>

        <div className="mb-12 grid grid-cols-1 gap-4 md:grid-cols-3">
          {STATS.map(({ icon, title, desc }, i) => (
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

        <Reveal delayMs={300}>
          <a
            href="https://tmutechweek.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm tracking-widest text-accent uppercase transition-colors hover:text-white"
          >
            View Full Recap →
          </a>
        </Reveal>
      </div>
    </section>
  )
}
