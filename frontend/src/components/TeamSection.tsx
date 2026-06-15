import { useState } from 'react'
import { meetTheTeamData, type Member } from '../lib/teamData'
import { useInView } from '../hooks/useInView'
import MemberModal from './MemberModal'

const VISIBLE = 5

// Derive the 5 tiers from the flat category data
const allMembers = meetTheTeamData.flatMap(c => c.members)
const seen = new Set<string>()
function unique(members: Member[]) {
  return members.filter(m => {
    if (seen.has(m.id)) return false
    seen.add(m.id)
    return true
  })
}

const president   = unique(allMembers.filter(m => m.position === 'President'))
const vps         = unique(allMembers.filter(m => m.position.startsWith('VP of')))
const leadership  = unique(allMembers.filter(m =>
  m.categories.includes('Leadership') &&
  m.position !== 'President' &&
  !m.position.startsWith('VP of')
))
const strategic   = unique(allMembers.filter(m =>
  m.categories.includes('Strategic Team') &&
  !m.position.startsWith('VP of')
))
const technical   = unique(allMembers.filter(m =>
  m.categories.includes('Technical Team') &&
  !m.position.startsWith('VP of')
))

const SECTIONS = [
  { label: 'Vice Presidents', members: vps,       arrows: false },
  { label: 'Leadership',      members: leadership, arrows: false },
  { label: 'Strategic Team',  members: strategic,  arrows: true  },
  { label: 'Technical Team',  members: technical,  arrows: true  },
]

function MemberCard({ member, onClick }: { member: Member; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-3 group w-32 shrink-0 cursor-pointer"
    >
      <img
        src={member.profilePicUrl}
        alt={member.name}
        className="h-24 w-24 rounded-full border-2 border-[#222222] object-cover transition-all duration-200 group-hover:border-accent group-hover:scale-105"
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

function ArrowCarousel({ members, onSelect }: { members: Member[]; onSelect: (m: Member) => void }) {
  const [index, setIndex] = useState(0)
  const canPrev = index > 0
  const canNext = index + VISIBLE < members.length

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => setIndex(i => Math.max(0, i - 1))}
        disabled={!canPrev}
        className="shrink-0 border border-[#222222] p-3 text-white transition-all duration-200 hover:border-accent hover:text-accent disabled:opacity-20 disabled:cursor-not-allowed"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div className="flex flex-1 justify-around">
        {members.slice(index, index + VISIBLE).map(m => (
          <MemberCard key={m.id} member={m} onClick={() => onSelect(m)} />
        ))}
      </div>

      <button
        onClick={() => setIndex(i => Math.min(members.length - VISIBLE, i + 1))}
        disabled={!canNext}
        className="shrink-0 border border-[#222222] p-3 text-white transition-all duration-200 hover:border-accent hover:text-accent disabled:opacity-20 disabled:cursor-not-allowed"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  )
}

export default function TeamSection() {
  const [ref, inView] = useInView(0.1)
  const [selected, setSelected] = useState<Member | null>(null)

  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div ref={ref} className={`reveal ${inView ? 'visible' : ''} mb-16`}>
        <p className="mb-2 font-mono text-xs tracking-widest text-accent uppercase">The Team</p>
        <h2 className="text-4xl font-black tracking-tight md:text-5xl">Who We Are</h2>
      </div>

      <div className="space-y-14">
        {/* President — centered, no arrows */}
        <div>
          <p className="mb-5 font-mono text-xs tracking-widest text-muted uppercase border-b border-[#222222] pb-3">
            President
          </p>
          <div className="flex justify-center">
            {president.map(m => (
              <MemberCard key={m.id} member={m} onClick={() => setSelected(m)} />
            ))}
          </div>
        </div>

        {/* VP, Leadership — flat rows. Strategic, Technical — arrow carousels */}
        {SECTIONS.map(({ label, members, arrows }) => {
          if (!members.length) return null
          return (
            <div key={label}>
              <p className="mb-5 font-mono text-xs tracking-widest text-muted uppercase border-b border-[#222222] pb-3">
                {label}
              </p>
              {arrows ? (
                <ArrowCarousel members={members} onSelect={setSelected} />
              ) : (
                <div className="flex justify-around">
                  {members.map(m => (
                    <MemberCard key={m.id} member={m} onClick={() => setSelected(m)} />
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <MemberModal member={selected} onClose={() => setSelected(null)} />
    </section>
  )
}