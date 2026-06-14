import { useInView } from '../hooks/useInView'

const ITEMS = [
  '40+ Members',
  '5 Project Teams',
  '3 Conferences',
  '8 Hackathons',
  'Open Source',
  'Free to Join',
  'Build · Learn · Ship',
]

export default function StatsTicker() {
  const doubled = [...ITEMS, ...ITEMS]
  const [ref, inView] = useInView(0.5)

  return (
    <div
      ref={ref}
      className={`reveal ${inView ? 'visible' : ''} border-y border-[#222222] py-4 overflow-hidden`}
    >
      <div className="ticker-track">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center whitespace-nowrap">
            <span className="font-mono text-sm tracking-widest text-muted uppercase px-8">
              {item}
            </span>
            <span className="text-accent text-lg leading-none">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
