import { useState, useMemo } from 'react'
import { meetTheTeamData, type Member } from '../lib/teamData'
import { useInView } from '../hooks/useInView'
import MemberModal from './MemberModal'


const SECTIONS = [
  { label: 'Leadership',      key: 'leadership', arrows: false },
  { label: 'Vice Presidents', key: 'vp',        arrows: false },
  { label: 'Technical Team',  key: 'technical',  arrows: true  },
  { label: 'Strategic Team',  key: 'strategic',  arrows: true  },
]

function MemberCard({ member, onClick }: { member: Member; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-3 group w-28 sm:w-32 shrink-0 cursor-pointer"
    >
      <img
        src={member.profilePicUrl}
        alt={member.name}
        className="h-20 w-20 sm:h-24 sm:w-24 rounded-full border-2 border-[#222222] object-cover transition-all duration-200 group-hover:border-accent group-hover:scale-105"
      />
      <div className="text-center w-full">
        <p className="text-sm font-semibold text-white group-hover:text-accent transition-colors leading-tight break-words">
          {member.name}
        </p>
        <p className="mt-0.5 font-mono text-[10px] tracking-wider text-muted uppercase break-words">
          {member.position}
        </p>
      </div>
    </button>
  )
}


export default function TeamSection() {
  const [ref, inView] = useInView(0.1)
  const [selected, setSelected] = useState<Member | null>(null)

  const { president, groups } = useMemo(() => {
    const all = meetTheTeamData.flatMap(c => c.members)
    const seen = new Set<string>()
    const unique = (members: Member[]) => members.filter(m => {
      if (seen.has(m.id)) return false
      seen.add(m.id)
      return true
    })

    const president = unique(all.filter(m => m.position === 'President'))

    const vp = unique(all.filter(m =>
      m.position.startsWith('VP of') || m.id === 'cos-001' || m.id === 'vp-tech-001'
    ))

    const leadership = unique(all.filter(m =>
      m.categories.includes('Leadership') &&
      m.position !== 'President' &&
      !m.position.startsWith('VP of') &&
      m.id !== 'cos-001'
    ))

    const strategic = unique(all.filter(m =>
      m.categories.includes('Strategic Team') &&
      !m.position.startsWith('VP of')
    ))

    const technical = unique(all.filter(m =>
      m.categories.includes('Technical Team') &&
      !m.position.startsWith('VP of') &&
      m.id !== 'vp-tech-001'
    ))

    return {
      president,
      groups: { vp, leadership, strategic, technical }
    }
  }, [])

  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div ref={ref} className={`reveal ${inView ? 'visible' : ''} mb-16`}>
        <p className="mb-2 font-mono text-xs tracking-widest text-accent uppercase">The Team</p>
        <h2 className="text-4xl font-black tracking-tight md:text-5xl">Who We Are</h2>
      </div>

      <div className="space-y-14">
        <div>
          <p className="mb-5 font-mono text-xs tracking-widest text-muted uppercase border-b border-[#222222] pb-3">
            {president.length > 1 ? 'Presidents' : 'President'}
          </p>
          <div className="flex justify-center">
            {president.map(m => (
              <MemberCard key={m.id} member={m} onClick={() => setSelected(m)} />
            ))}
          </div>
        </div>

        {SECTIONS.map(({ label, key }) => {
          const members = groups[key as keyof typeof groups]
          if (!members.length) return null
          return (
            <div key={key}>
              <p className="mb-5 font-mono text-xs tracking-widest text-muted uppercase border-b border-[#222222] pb-3">
                {label}
              </p>
              <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-8 justify-center">
                {members.map(m => (
                  <MemberCard key={m.id} member={m} onClick={() => setSelected(m)} />
                ))}
              </div>
            </div>
          )
        })}
      </div>

      <MemberModal member={selected} onClose={() => setSelected(null)} />
    </section>
  )
}